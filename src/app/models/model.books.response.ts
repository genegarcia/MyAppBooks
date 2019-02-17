import { BookInterface } from './models-bookInterface';

export interface BooksResponse {
    libros: Array<BookInterface>
}

export interface BookResponse {
    libro: BookInterface
}