import { PageContainer } from '@/shared/ui/page-container';
import { PageHeader } from '@/shared/ui/page-header';

export default function AdminMarketCreatePage() {
  return (
    <PageContainer>
      <PageHeader title="마켓 생성" description="새로운 예측 마켓 생성" />
      <div className="space-y-6">
        <p>관리자 마켓 생성 페이지입니다.</p>
        {/* TODO: 마켓 생성 폼 (제목, 카테고리, 응답 타입, 옵션, 일정 등) 구현 */}
      </div>
    </PageContainer>
  );
}