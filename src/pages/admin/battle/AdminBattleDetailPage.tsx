import { useParams } from 'react-router-dom';
import { PageContainer } from '@/shared/ui/page-container';
import { PageHeader } from '@/shared/ui/page-header';

export default function AdminBattleDetailPage() {
  const { battleId } = useParams<{ battleId: string }>();

  return (
    <PageContainer>
      <PageHeader 
        title="배틀 관리 상세" 
        description={`배틀 ID: ${battleId}`} 
      />
      <div className="space-y-6">
        <p>관리자 배틀 상세 페이지입니다.</p>
        <p>배틀 ID: {battleId}</p>
        {/* TODO: 배틀 승인/거절/취소 등 관리 기능 구현 */}
      </div>
    </PageContainer>
  );
}