import { ResponseFailure } from "./response";
import { Route, Router } from "./router";

export class Api {
  routers: Router[];

  constructor() {
    this.routers = [];
  }

  register(router: Router) {
    this.routers.push(router);
  }

  route(request: Request) {
    const route = this.routers.reduce<Route | undefined>((accum, router) => {
      const route = router.resolve(request);
      if (route) {
        return route;
      }
      return undefined;
    }, undefined);

    if (route) {
      return route.handler(request);
    }

    return ResponseFailure({
      code: 404,
      errorMessage: `The route "${request.url}" does not exist.`,
    });
  }
}
