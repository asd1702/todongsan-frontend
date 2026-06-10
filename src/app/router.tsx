import { createBrowserRouter } from "react-router-dom";
import { ROUTE_PATH } from "@/shared/constants/routePath";
import { HomePage } from "@/pages/home/HomePage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { KakaoCallbackPage } from "@/pages/auth/KakaoCallbackPage";
import { MarketListPage } from "@/pages/market/MarketListPage";
import { BattleListPage } from "@/pages/battle/BattleListPage";
import { MyPage } from "@/pages/my/MyPage";
import { AdminDashboardPage } from "@/pages/admin/AdminDashboardPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

import { AppShell } from "@/shared/ui/app-shell";

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      {
        path: ROUTE_PATH.HOME,
        element: <HomePage />,
      },
      {
        path: ROUTE_PATH.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTE_PATH.KAKAO_CALLBACK,
        element: <KakaoCallbackPage />,
      },
      {
        path: ROUTE_PATH.MARKETS,
        element: <MarketListPage />,
      },
      {
        path: ROUTE_PATH.BATTLES,
        element: <BattleListPage />,
      },
      {
        path: ROUTE_PATH.MY,
        element: <MyPage />,
      },
      {
        path: ROUTE_PATH.ADMIN,
        element: <AdminDashboardPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
