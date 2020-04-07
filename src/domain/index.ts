export type Author = {
  id: string;
  firstName: string;
  lastName: string;
  age?: number;
  pseudoName?: string;
};

export type AuthorModel = Omit<Author, "id">;

export type Book = {
  id: string;
  title: string;
  author: Author;
};

export type BookModel = Omit<Book, "id"> & { author: AuthorModel };
