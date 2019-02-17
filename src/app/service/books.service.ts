import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

import {UserService} from '../service/user.service';
import { BookInterface } from '../models/models-bookInterface';
import { BooksResponse, BookResponse } from '../models/model.books.response';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  public url: string;

  constructor( private _http:HttpClient, private userService:UserService){ }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": localStorage.getItem("accessToken")
  });

  private baseurl = 'https://d7ka3nqya8.execute-api.us-east-2.amazonaws.com/dev';
  
  createBook(book: BookInterface) {
    return this._http
      .post<BookInterface>(`${this.baseurl}/create`, book, { headers: this.headers })
      .pipe(map(data => data));
  }

  getAllBooks(): Observable<BooksResponse> {
    return this._http.get<BooksResponse>(`${this.baseurl}/getAll`, {headers: this.headers});
  }

  getBookById(id: string): Observable<BookResponse> {
    return this._http.get<BookResponse>(`${this.baseurl}/get/`+id, {headers: this.headers});
  }

  edit(id: string, book: BookInterface) {
    return this._http.put<BookResponse>(`${this.baseurl}/update/`+id, book, {headers: this.headers});
  }

  delete(id: string) {
    return this._http.delete<BookResponse>(`${this.baseurl}/delete/`+id, {headers: this.headers});
  }
}