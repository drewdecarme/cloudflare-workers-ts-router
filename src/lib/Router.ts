import { ResponseFailure } from "./response";

/**
 * Helper functions that when passed a request will return a
 * boolean indicating if the request uses that HTTP method,
 * header, host or referrer.
 */
type ValidateMethod = (method: string) => (req: { method: string }) => boolean;
const validateMethod: ValidateMethod = (method) => ({
  method: requestMethod,
}) => requestMethod.toLowerCase() === method.toLowerCase();

const Connect = validateMethod("connect");
const Delete = validateMethod("delete");
const Get = validateMethod("get");
const Head = validateMethod("head");
const Options = validateMethod("options");
const Patch = validateMethod("patch");
const Post = validateMethod("post");
const Put = validateMethod("put");
const Trace = validateMethod("trace");

const Header = (header: string, val: any) => (req: Request) =>
  req.headers.get(header) === val;
const Host = (host: string) => Header("host", host.toLowerCase());
const Referrer = (host: string) => Header("referrer", host.toLowerCase());

type PathInput = RegExp | string;
type ValidatePath = (regExp: PathInput) => (req: Request) => boolean;
const validatePath: ValidatePath = (regExp) => (req) => {
  const url = new URL(req.url);
  const path = url.pathname;
  const match = path.match(regExp) || [];
  return match[0] === path;
};

/**
 * The Router handles determines which handler is matched given the
 * conditions present for each request.
 */
interface RouterOptions {
  preFlight?: boolean;
}
type RouteHandler<T> = (req: Request, options?: RouterOptions) => Promise<T>; // @todo better define this interface
type RouteConditions =
  | [ReturnType<ValidateMethod>, ReturnType<ValidatePath>]
  | [];
export type Route<T = any> = {
  handler: RouteHandler<T>;
  conditions: RouteConditions;
};

export class Router {
  routes: Route[];

  constructor() {
    this.routes = [];
  }

  handle<T>(conditions: RouteConditions, handler: RouteHandler<T>) {
    this.routes.push({
      conditions,
      handler,
    });
    return this;
  }

  connect<T>(url: PathInput, handler: RouteHandler<T>) {
    return this.handle<T>([Connect, validatePath(url)], handler);
  }

  delete<T>(url: PathInput, handler: RouteHandler<T>) {
    return this.handle<T>([Delete, validatePath(url)], handler);
  }

  get<T>(url: PathInput, handler: RouteHandler<T>) {
    return this.handle<T>([Get, validatePath(url)], handler);
  }

  head<T>(url: PathInput, handler: RouteHandler<T>) {
    return this.handle<T>([Head, validatePath(url)], handler);
  }

  options<T>(url: PathInput, handler: RouteHandler<T>) {
    return this.handle<T>([Options, validatePath(url)], handler);
  }

  patch<T>(url: PathInput, handler: RouteHandler<T>) {
    return this.handle<T>([Patch, validatePath(url)], handler);
  }

  post<T>(url: PathInput, handler: RouteHandler<T>) {
    return this.handle<T>([Post, validatePath(url)], handler);
  }

  put<T>(url: PathInput, handler: RouteHandler<T>) {
    return this.handle<T>([Put, validatePath(url)], handler);
  }

  trace<T>(url: PathInput, handler: RouteHandler<T>) {
    return this.handle<T>([Trace, validatePath(url)], handler);
  }

  all<T>(handler: RouteHandler<T>) {
    return this.handle<T>([], handler);
  }

  /**
   * resolve returns the matching route for a request that returns
   * true for all conditions (if any).
   */
  resolve(req: Request) {
    return this.routes.find((route) => {
      // if there aren't any conditions to meet return true
      // so the route will resolve
      if (
        !route.conditions ||
        (Array.isArray(route) && !route.conditions.length)
      ) {
        return true;
      }

      // otherwise validated each of the conditions
      return route.conditions.every((condition) => {
        return condition(req);
      });
    });
  }

  route(request: Request) {
    const route = this.resolve(request);

    if (route) {
      return route.handler(request);
    }

    ResponseFailure({
      code: 404,
      errorMessage: `The route "${request.url}" does not exist.`,
    });
  }
}
