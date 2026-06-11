import { useParams } from 'react-router-dom';
import { PageContainer } from '@/shared/ui/page-container';
import { PageHeader } from '@/shared/ui/page-header';

export default function AdminBattleReportPage() {
  const { battleId } = useParams<{ battleId: string }>();

  return (
    <PageContainer>
      <PageHeader 
        title="배틀 AI 리포트" 
        description={`배틀 ID: ${battleId}`} 
      />
      <div className="space-y-6">
        <p>관리자 배틀 AI 리포트 페이지입니다.</p>
        <p>배틀 ID: {battleId}</p>
        {/* TODO: 배틀 AI 리포트 조회, 자동 생성된 리포트 등 구현 */}
      </div>
    </PageContainer>
  );
}