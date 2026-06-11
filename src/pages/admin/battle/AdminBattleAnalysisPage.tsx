import { useParams } from 'react-router-dom';
import { PageContainer } from '@/shared/ui/page-container';
import { PageHeader } from '@/shared/ui/page-header';

export default function AdminBattleAnalysisPage() {
  const { battleId } = useParams<{ battleId: string }>();

  return (
    <PageContainer>
      <PageHeader 
        title="배틀 교차분석" 
        description={`배틀 ID: ${battleId}`} 
      />
      <div className="space-y-6">
        <p>관리자 배틀 교차분석 페이지입니다.</p>
        <p>배틀 ID: {battleId}</p>
        {/* TODO: 배틀 교차분석 결과, 인구통계학적 분석 등 구현 */}
      </div>
    </PageContainer>
  );
}