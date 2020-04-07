export type ErrorResponse = {
  errorMessage: string;
  errorContext?: any;
};

import {
  ServiceErrorStatusCodes,
  transposedServiceErrorCodes,
} from "./ServiceError";

type SuccessStatusCode = 200;

export const ResponseSuccess = (code: SuccessStatusCode, json?: any) => {
  if (json) {
    return new Response(JSON.stringify(json), {
      statusText: "OK",
    });
  }
  return new Response("", {
    statusText: "OK",
  });
};

export const ResponseFailure = ({
  code,
  errorMessage,
  errorContext,
}: ErrorResponse & { code: ServiceErrorStatusCodes }) =>
  new Response(JSON.stringify({ errorMessage, errorContext }), {
    status: code,
    statusText: transposedServiceErrorCodes[code],
  });

export const autoApprove = async () => ResponseSuccess(200);
