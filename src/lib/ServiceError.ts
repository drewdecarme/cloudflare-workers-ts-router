export type ServiceErrorStatusMessage =
  | "NOT ALLOWED"
  | "NOT FOUND"
  | "SERVER ERROR";
export type ServiceErrorStatusCodes = 405 | 404 | 500;

export const serviceErrorCodes: {
  [key in ServiceErrorStatusMessage]: ServiceErrorStatusCodes;
} = {
  "NOT ALLOWED": 405,
  "NOT FOUND": 404,
  "SERVER ERROR": 500,
};

export const transposedServiceErrorCodes = Object.entries(
  serviceErrorCodes
).reduce(
  (accum, [key, value]) => ({
    ...accum,
    [value]: key,
  }),
  {} as { [key in ServiceErrorStatusCodes]: ServiceErrorStatusMessage }
);

export class ServiceError extends Error {
  code: number;
  context?: any;

  constructor(code: ServiceErrorStatusMessage, message: string, context?: any) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, ServiceError);
    this.code = serviceErrorCodes[code];
    this.context = context;
  }
}
