// core/api/api.config.ts
export const API_CONFIG = {
  // API versions
  VERSION: {
    V1: 'v1',
    V2: 'v2',
  },
  DEFAULT_VERSION: 'v1',
  // Endpoints organized by feature
  ENDPOINTS: {
    // Authentication
    AUTH: {
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
      REGISTER: '/auth/register',
      RESET_PASSWORD: '/auth/reset-password',
      VERIFY_EMAIL: '/auth/verify-email',
      CHANGE_PASSWORD: '/Auth/ChangePassword',
      FORGOT_PASSWORD: '/Auth/ForgotPassword',
      SEND_OTP: '/auth/send-otp',
      VERIFY_OTP: '/auth/verify-otp',
      EXTRACT_NID_INFO: '/auth/extract-nid-info',
    },
    UTILITY: {
      UPLOAD_FILE: `/upload/single`,
    },
  },
  // HTTP Headers
  HEADERS: {
    CONTENT_TYPE: {
      JSON: 'application/json',
      FORM_DATA: 'multipart/form-data',
      URL_ENCODED: 'application/x-www-form-urlencoded',
    },
    ACCEPT: {
      JSON: 'application/json',
      XML: 'application/xml',
      CSV: 'text/csv',
      PDF: 'application/pdf',
    },
  },

  // Error codes and messages
  ERROR_CODES: {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    VALIDATION_ERROR: 422,
    SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
  },
  // Request configuration
  REQUEST_CONFIG: {
    DEFAULT_TIMEOUT: 30000,
    UPLOAD_TIMEOUT: 300000, // 5 minutes for file uploads
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,
  },
};
// Export helper functions
export const ApiEndpoints = API_CONFIG.ENDPOINTS;
export const ApiHeaders = API_CONFIG.HEADERS;
export const ApiErrorCodes = API_CONFIG.ERROR_CODES;
export const ApiVersions = API_CONFIG.VERSION;
