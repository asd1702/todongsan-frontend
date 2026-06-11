// 도메인별 handler 통합 export
import { authHandlers } from './auth';
import { battleHandlers } from './battle';
import { marketHandlers } from './market';
import { memberHandlers } from './member';
import { insightHandlers } from './insight';

export const handlers = [
  ...authHandlers,
  ...battleHandlers,
  ...marketHandlers,
  ...memberHandlers,
  ...insightHandlers,
];

export {
  authHandlers,
  battleHandlers,
  marketHandlers,
  memberHandlers,
  insightHandlers,
};