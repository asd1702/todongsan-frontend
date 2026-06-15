import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyProfile, updateMyProfile } from "../api/memberApi";
import { memberKeys } from "./member.keys";
import type { UpdateMemberProfileRequest } from "./member.types";

export function useMyProfileQuery() {
  return useQuery({
    queryKey: memberKeys.me(),
    queryFn: getMyProfile,
  });
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateMemberProfileRequest) => updateMyProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberKeys.me() });
    },
  });
}
