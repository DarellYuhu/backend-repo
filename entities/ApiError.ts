class ApiError extends Error {
  public readonly status = "FAILED";
  public readonly statusCode: number;
  public readonly error: any;

  constructor(message: string, statusCode: number, error?: any) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
  }
}

export default ApiError;
