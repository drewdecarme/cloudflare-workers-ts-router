import { bookRouter } from "./features/books";
import { Api } from "./lib/Api";
import { responseHeaders } from "./lib/util";

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request: Request): Promise<Response> {
  // instantiate the API class
  const worker = new Api();

  // register routes
  worker.register(bookRouter);

  // match and run the route
  const response = await worker.route(request);

  Object.entries(responseHeaders).forEach(([headerKey, headerValue]) =>
    response.headers.append(headerKey, headerValue)
  );

  return response;
}
