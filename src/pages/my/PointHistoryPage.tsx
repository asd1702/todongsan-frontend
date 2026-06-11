import { PageContainer } from '@/shared/ui/page-container';
import { PageHeader } from '@/shared/ui/page-header';

export default function PointHistoryPage() {
  return (
    <PageContainer>
      <PageHeader title="포인트 내역" />
      <div className="space-y-6">
        <p>포인트 내역 페이지입니다.</p>
        {/* TODO: 포인트 히스토리 테이블, 필터, 페이지네이션 구현 */}
      </div>
    </PageContainer>
  );
}