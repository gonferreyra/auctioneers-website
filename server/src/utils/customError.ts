export const enum AppErrorCode {
  InvalidAccessToken = 'INVALID_ACCESS_TOKEN',
}

class CustomError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public errorCode?: AppErrorCode
  ) {
    super(message);
  }
}

export default CustomError;
