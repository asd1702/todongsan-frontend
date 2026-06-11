import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// MSW worker 설정
export const worker = setupWorker(...handlers);

// 개발 환경에서만 MSW 시작
export async function enableMocking() {
  if (import.meta.env.DEV) {
    return worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
}

