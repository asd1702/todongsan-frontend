export type ApiResponse<T> = {
  success: boolean;
  errorCode: string | null;
  message: string | null;
  data: T | null;
  timestamp: string;
};
