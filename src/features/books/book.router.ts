import { autoApprove } from "../../lib/response";
import { Router } from "../../lib/Router";
import { createNewBook, getBook } from "./book.worker";

export const bookRouter = new Router();

bookRouter.options("/book", autoApprove);
bookRouter.get("/book", getBook);

bookRouter.options("/book/new", autoApprove);
bookRouter.post("/book/new", createNewBook);
