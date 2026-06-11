import { PageContainer } from '@/shared/ui/page-container';
import { PageHeader } from '@/shared/ui/page-header';

export default function VisitCertificationPage() {
  return (
    <PageContainer>
      <PageHeader title="방문 인증" />
      <div className="space-y-6">
        <p>방문 인증 페이지입니다.</p>
        {/* TODO: GPS 인증, 댓글 기반 인증, 인증 내역 등 구현 */}
      </div>
    </PageContainer>
  );
}