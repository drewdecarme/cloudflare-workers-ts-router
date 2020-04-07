import { BookModel } from "../../domain";
import {
  ResponseFailure,
  ResponseSuccess,
  ServiceError,
  parseRequestBody,
} from "../../lib";
import { createSingleBook, doesBookExist, getSingleBook } from "./book.service";

const alreadyExistingBook: {
  title: string;
  author: { firstName: string; lastName: string };
} = {
  title: "Serverless",
  author: {
    firstName: "Drew",
    lastName: "DeCarme",
  },
};

/**
 * Gets an existing book from the DB. If the book doesn't exist,
 * it will throw a 404 error and end the request
 */
export const getBook = async (request: Request): Promise<Response> => {
  try {
    const id = "8ebb5757-dc22-4d97-a567-b9b2a4c5292c";

    const bookExists = doesBookExist(id);
    if (!bookExists) {
      throw new ServiceError(
        "NOT FOUND",
        `A book with id "${id}" doesn't exist.`
      );
    }
    const book = await getSingleBook(id);

    return ResponseSuccess(200, book);
  } catch ({ code, message, context }) {
    return ResponseFailure({
      code: code,
      errorMessage: message,
      errorContext: context,
    });
  }
};

/**
 * Creates a book in the DB. If the book already exists,
 * it will throw a 500 error indicating that you can't add another book
 * with the same id
 */
export const createNewBook = async (request: Request): Promise<Response> => {
  try {
    const bookPayload = await parseRequestBody<BookModel>(request);
    const bookExists = bookPayload.title === alreadyExistingBook.title;

    if (!!bookExists) {
      throw new ServiceError(
        "SERVER ERROR",
        `A book with id "${bookPayload.title}" already exists in the DB.`
      );
    }

    const createdBook = await createSingleBook(bookPayload);
    return ResponseSuccess(200, createdBook);
  } catch ({ code, message, context }) {
    return ResponseFailure({
      code: code,
      errorMessage: message,
      errorContext: context,
    });
  }
};
