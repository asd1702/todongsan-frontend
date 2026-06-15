import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { PageContainer } from "@/shared/ui/page-container";
import { PageHeader } from "@/shared/ui/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Skeleton } from "@/shared/ui/skeleton";
import { ErrorState } from "@/shared/ui/error-state";
import { useMyProfileQuery, useUpdateProfileMutation } from "@/entities/member/model/member.queries";
import { useAuthStore } from "@/entities/auth/model/auth.store";
import { SIDO_LIST, SIGUNGU_MAP } from "@/shared/constants/regions";
import { formatDate } from "@/shared/lib/formatDate";
import { toApiError } from "@/shared/api/apiError";
import { ROUTE_PATH } from "@/shared/constants/routePath";

const RESIDENCE_CHANGE_COOLDOWN_DAYS = 30;

const profileSchema = z.object({
  nickname: z.string().min(1, "닉네임을 입력해주세요.").max(50, "닉네임은 50자 이하로 입력해주세요."),
  residenceSido: z.string().optional(),
  residenceSigu: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileEditPage() {
  const navigate = useNavigate();
  const profileQuery = useMyProfileQuery();
  const updateMutation = useUpdateProfileMutation();
  const profile = profileQuery.data;

  const { control, register, handleSubmit, watch, setValue, reset, formState: { errors } } =
    useForm<ProfileFormValues>({
      resolver: zodResolver(profileSchema),
      defaultValues: { nickname: "", residenceSido: "", residenceSigu: "" },
    });

  useEffect(() => {
    if (profile) {
      reset({
        nickname: profile.nickname ?? "",
        residenceSido: profile.residenceSido ?? "",
        residenceSigu: profile.residenceSigu ?? "",
      });
    }
  }, [profile, reset]);

  const selectedSido = watch("residenceSido");
  const sigunguOptions = selectedSido ? SIGUNGU_MAP[selectedSido] ?? [] : [];

  const cooldown = useMemo(() => {
    if (!profile?.residenceChangedAt) return null;

    const changedAt = new Date(profile.residenceChangedAt);
    if (isNaN(changedAt.getTime())) return null;

    const nextEligibleAt = new Date(changedAt);
    nextEligibleAt.setDate(nextEligibleAt.getDate() + RESIDENCE_CHANGE_COOLDOWN_DAYS);

    if (new Date() < nextEligibleAt) {
      return { nextEligibleAt: nextEligibleAt.toISOString() };
    }
    return null;
  }, [profile?.residenceChangedAt]);

  const isResidenceLocked = !!cooldown;

  const onSubmit = (values: ProfileFormValues) => {
    if (!profile) return;

    const payload: { nickname?: string; residenceSido?: string; residenceSigu?: string } = {};

    if (values.nickname !== profile.nickname) {
      payload.nickname = values.nickname;
    }

    if (!isResidenceLocked) {
      if (values.residenceSido && values.residenceSido !== profile.residenceSido) {
        payload.residenceSido = values.residenceSido;
      }
      if (values.residenceSigu && values.residenceSigu !== profile.residenceSigu) {
        payload.residenceSigu = values.residenceSigu;
      }
    }

    if (Object.keys(payload).length === 0) {
      toast.info("변경된 내용이 없습니다.");
      return;
    }

    updateMutation.mutate(payload, {
      onSuccess: (data) => {
        if (data.nickname) {
          useAuthStore.getState().updateProfile(data.nickname);
        }
        toast.success("내 정보가 수정되었습니다.");
        navigate(ROUTE_PATH.MY);
      },
      onError: (error) => {
        const apiError = toApiError(error);
        if (apiError.errorCode === "MEMBER_NICKNAME_DUPLICATE") {
          toast.error("이미 사용 중인 닉네임입니다.");
        } else if (apiError.errorCode === "MEMBER_RESIDENCE_CHANGE_COOLDOWN") {
          toast.error("거주지는 30일마다 한 번만 변경할 수 있습니다.");
        } else {
          toast.error(apiError.message);
        }
      },
    });
  };

  if (profileQuery.isError) {
    return (
      <PageContainer>
        <PageHeader title="내 정보 수정" />
        <ErrorState />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader title="내 정보 수정" description="닉네임과 거주지 정보를 수정할 수 있습니다." />

      <Card className="mx-auto w-full max-w-lg rounded-2xl border-slate-200 bg-white">
        <CardHeader>
          <CardTitle className="text-base font-bold">기본 정보</CardTitle>
          <CardDescription className="text-xs">
            거주지는 변경 후 {RESIDENCE_CHANGE_COOLDOWN_DAYS}일 동안 다시 변경할 수 없습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {profileQuery.isPending ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="nickname" className="text-xs font-bold text-slate-700">
                  닉네임
                </label>
                <Input id="nickname" {...register("nickname")} placeholder="닉네임을 입력하세요" />
                {errors.nickname && (
                  <p className="text-xs text-destructive">{errors.nickname.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">시/도</label>
                  <Controller
                    control={control}
                    name="residenceSido"
                    render={({ field }) => (
                      <Select
                        value={field.value ?? null}
                        onValueChange={(value) => {
                          field.onChange(value);
                          setValue("residenceSigu", "");
                        }}
                        disabled={isResidenceLocked}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="시/도 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {SIDO_LIST.map((sido) => (
                            <SelectItem key={sido} value={sido}>
                              {sido}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">시/군/구</label>
                  <Controller
                    control={control}
                    name="residenceSigu"
                    render={({ field }) => (
                      <Select
                        value={field.value ?? null}
                        onValueChange={field.onChange}
                        disabled={isResidenceLocked || !selectedSido}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="시/군/구 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {sigunguOptions.map((sigu) => (
                            <SelectItem key={sigu} value={sigu}>
                              {sigu}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              {isResidenceLocked && cooldown && (
                <p className="text-xs text-slate-500">
                  거주지는 {formatDate(cooldown.nextEligibleAt)} 이후에 다시 변경할 수 있습니다.
                </p>
              )}

              <Button type="submit" className="w-full" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? "저장 중..." : "저장하기"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </PageContainer>
  );
}
