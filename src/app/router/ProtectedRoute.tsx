import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/shared/hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // 로그인 후 원래 페이지로 돌아가기 위해 state에 현재 위치 저장
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}