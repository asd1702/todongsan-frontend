import { useParams } from 'react-router-dom';
import { PageContainer } from '@/shared/ui/page-container';
import { PageHeader } from '@/shared/ui/page-header';

export default function MarketDetailPage() {
  const { marketId } = useParams<{ marketId: string }>();

  return (
    <PageContainer>
      <PageHeader 
        title="마켓 상세" 
        description={`마켓 ID: ${marketId}`} 
      />
      <div className="space-y-6">
        <p>마켓 상세 페이지입니다.</p>
        <p>마켓 ID: {marketId}</p>
        {/* TODO: 마켓 상세 정보, 예측 참여, 가격 차트 등 구현 */}
      </div>
    </PageContainer>
  );
}

export { MarketDetailPage as Component };