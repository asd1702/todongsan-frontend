import { PageContainer } from '@/shared/ui/page-container';
import { PageHeader } from '@/shared/ui/page-header';

export default function ProfileEditPage() {
  return (
    <PageContainer>
      <PageHeader title="내 정보 수정" />
      <div className="space-y-6">
        <p>내 정보 수정 페이지입니다.</p>
        {/* TODO: 닉네임, 거주지 수정 폼 구현 */}
      </div>
    </PageContainer>
  );
}