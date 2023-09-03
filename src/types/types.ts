import { Dispatch, SetStateAction } from "react";

export type Book = {
  id?: number;
  title: string;
  desc: string;
  price: number;
  cover?: string;
}

/* Add book component */
export type AddProps = {
  setShowAddModal: Dispatch<SetStateAction<boolean>>;
  setBooks: Dispatch<SetStateAction<Book[]>>;
}

/* Update book component */
export type UpdateProps = {
  setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
  setBooks: Dispatch<SetStateAction<Book[]>>;
  bookForUpdate: Book; 
}

/* Delete button component */
export type DeleteButtonProps = {
  book: Book;
  setBooks: Dispatch<SetStateAction<Book[]>>;
}
