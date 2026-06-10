export type ApiErrorResponse = {
  success: false;
  errorCode: string;
  message: string;
  data: null;
  timestamp: string;
};

export class ApiError extends Error {
  readonly status?: number;
  readonly errorCode?: string;

  constructor(message: string, options?: { status?: number; errorCode?: string }) {
    super(message);
    this.name = "ApiError";
    this.status = options?.status;
    this.errorCode = options?.errorCode;
  }
}
