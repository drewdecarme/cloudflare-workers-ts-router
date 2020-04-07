import { Book, BookModel } from "../../domain";
import { ServiceError } from "../../lib";

const sampleBookFromDb: Book = {
  id: "bfaed9c2-c96e-4bbe-a1d3-4bf9e00e62a9",
  title: "Serverless with Cloudflare & TypeScript",
  author: {
    id: "f4cd6333-3473-41ed-92b9-f87c6393fe82",
    firstName: "Drew",
    lastName: "DeCarme",
  },
};

/**
 * Checks to see if the book already exists in the DB or not
 */
export const doesBookExist = async (
  id: Book["id"]
): Promise<Book | undefined> => {
  try {
    return undefined;
  } catch (error) {
    throw new ServiceError("SERVER ERROR", error);
  }
};

/**
 * Gets an existing book in the DB
 */
export const getSingleBook = async (id: Book["id"]): Promise<Book> => {
  try {
    // get book from DB
    return sampleBookFromDb;
  } catch (error) {
    throw new ServiceError(
      "SERVER ERROR",
      `Error when trying to get book ${id}`,
      error
    );
  }
};

/**
 * Updates a new book entry in the DB
 */
export const createSingleBook = async (book: BookModel): Promise<Book> => {
  try {
    // Save in the DB
    return sampleBookFromDb;
  } catch (error) {
    throw new ServiceError(
      "SERVER ERROR",
      "Error when creating the book in the DB",
      error
    );
  }
};

/**
 * Updates a book in the DB
 */
export const updateSingleBook = async (book: Partial<Book>): Promise<Book> => {
  try {
    // Update in the DB
    return sampleBookFromDb;
  } catch (error) {
    throw new ServiceError(
      "SERVER ERROR",
      "Error when updating the book in the DB",
      error
    );
  }
};
