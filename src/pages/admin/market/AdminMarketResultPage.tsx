import { useParams } from 'react-router-dom';
import { PageContainer } from '@/shared/ui/page-container';
import { PageHeader } from '@/shared/ui/page-header';

export default function AdminMarketResultPage() {
  const { marketId } = useParams<{ marketId: string }>();

  return (
    <PageContainer>
      <PageHeader 
        title="마켓 결과 확정" 
        description={`마켓 ID: ${marketId}`} 
      />
      <div className="space-y-6">
        <p>관리자 마켓 결과 확정 페이지입니다.</p>
        <p>마켓 ID: {marketId}</p>
        {/* TODO: 결과 확정 폼 (선택형/숫자형 결과 입력) 구현 */}
      </div>
    </PageContainer>
  );
}