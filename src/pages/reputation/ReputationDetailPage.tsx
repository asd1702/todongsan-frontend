import { useParams } from 'react-router-dom';
import { PageContainer } from '@/shared/ui/page-container';
import { PageHeader } from '@/shared/ui/page-header';

export default function ReputationDetailPage() {
  const { memberId } = useParams<{ memberId: string }>();

  return (
    <PageContainer>
      <PageHeader 
        title="신뢰도 상세" 
        description={`회원 ID: ${memberId}`} 
      />
      <div className="space-y-6">
        <p>신뢰도 상세 페이지입니다.</p>
        <p>회원 ID: {memberId}</p>
        {/* TODO: 신뢰도 정보, 활동 스코어, 예측 정확도 등 구현 */}
      </div>
    </PageContainer>
  );
}