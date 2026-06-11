import axios from "axios";

export type ApiError = {
  status?: number;
  errorCode: string;
  message: string;
  timestamp?: string;
};

export function isApiError(error: unknown): error is ApiError {
  const err = error as Record<string, unknown> | null;
  return (
    typeof error === "object" &&
    error !== null &&
    "errorCode" in error &&
    typeof err?.errorCode === "string" &&
    "message" in error &&
    typeof err?.message === "string"
  );
}

export function toApiError(error: unknown): ApiError {
  if (isApiError(error)) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const responseData = error.response?.data;

    // Check if the response matches our ApiResponse format or has errorCode
    if (responseData && typeof responseData === "object") {
      const data = responseData as Record<string, unknown>;
      const errorCode = typeof data.errorCode === "string" ? data.errorCode : undefined;
      const message = typeof data.message === "string" ? data.message : undefined;
      const timestamp = typeof data.timestamp === "string" ? data.timestamp : undefined;
      return {
        status,
        errorCode: errorCode || "UNKNOWN_ERROR",
        message: message || error.message || "알 수 없는 오류가 발생했습니다.",
        timestamp: timestamp || new Date().toISOString(),
      };
    }

    // Network error (no response received)
    if (error.request) {
      return {
        status,
        errorCode: "NETWORK_ERROR",
        message: "네트워크 연결이 원활하지 않습니다. 다시 시도해주세요.",
        timestamp: new Date().toISOString(),
      };
    }

    return {
      status,
      errorCode: "UNKNOWN_ERROR",
      message: error.message || "알 수 없는 오류가 발생했습니다.",
      timestamp: new Date().toISOString(),
    };
  }

  // Generic Error
  if (error instanceof Error) {
    return {
      errorCode: "UNKNOWN_ERROR",
      message: error.message,
      timestamp: new Date().toISOString(),
    };
  }

  return {
    errorCode: "UNKNOWN_ERROR",
    message: "알 수 없는 에러가 발생했습니다.",
    timestamp: new Date().toISOString(),
  };
}
