import { useParams } from 'react-router-dom';
import { PageContainer } from '@/shared/ui/page-container';
import { PageHeader } from '@/shared/ui/page-header';

export default function MarketReportPage() {
  const { marketId } = useParams<{ marketId: string }>();

  return (
    <PageContainer>
      <PageHeader 
        title="마켓 AI 리포트" 
        description={`마켓 ID: ${marketId}`} 
      />
      <div className="space-y-6">
        <p>마켓 AI 리포트 페이지입니다.</p>
        <p>마켓 ID: {marketId}</p>
        {/* TODO: AI 리포트 조회, 생성 요청, 상태 polling 등 구현 */}
      </div>
    </PageContainer>
  );
}