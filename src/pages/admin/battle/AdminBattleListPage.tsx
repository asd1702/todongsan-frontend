import { PageContainer } from '@/shared/ui/page-container';
import { PageHeader } from '@/shared/ui/page-header';

export default function AdminBattleListPage() {
  return (
    <PageContainer>
      <PageHeader title="배틀 관리" description="배틀 승인/거절/취소 관리" />
      <div className="space-y-6">
        <p>관리자 배틀 목록 페이지입니다.</p>
        {/* TODO: 배틀 관리 목록, 검수 대기 배틀 등 구현 */}
      </div>
    </PageContainer>
  );
}