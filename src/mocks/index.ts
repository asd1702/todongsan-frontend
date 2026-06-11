export async function initMocks() {
  // production build에서 mock이 켜지지 않도록 DEV 환경이고 VITE_USE_MOCKS=true일 때만 시작합니다.
  if (import.meta.env.VITE_USE_MOCKS === "true" && import.meta.env.DEV) {
    const { worker } = await import("./browser");
    return worker.start({
      onUnhandledRequest: "bypass",
    });
  }
  return Promise.resolve();
}
