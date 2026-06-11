import { useParams } from 'react-router-dom';
import { PageContainer } from '@/shared/ui/page-container';
import { PageHeader } from '@/shared/ui/page-header';

export default function AdminMarketDetailPage() {
  const { marketId } = useParams<{ marketId: string }>();

  return (
    <PageContainer>
      <PageHeader 
        title="마켓 관리 상세" 
        description={`마켓 ID: ${marketId}`} 
      />
      <div className="space-y-6">
        <p>관리자 마켓 상세 페이지입니다.</p>
        <p>마켓 ID: {marketId}</p>
        {/* TODO: 마켓 활성화, 정산, 무효 처리 등 관리 기능 구현 */}
      </div>
    </PageContainer>
  );
}