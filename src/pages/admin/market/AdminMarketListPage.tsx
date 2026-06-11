import { PageContainer } from '@/shared/ui/page-container';
import { PageHeader } from '@/shared/ui/page-header';

export default function AdminMarketListPage() {
  return (
    <PageContainer>
      <PageHeader title="마켓 관리" description="마켓 생성/활성화/정산 관리" />
      <div className="space-y-6">
        <p>관리자 마켓 목록 페이지입니다.</p>
        {/* TODO: 마켓 관리 목록, 상태별 필터, 마켓 생성 버튼 등 구현 */}
      </div>
    </PageContainer>
  );
}