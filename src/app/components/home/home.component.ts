import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import { BooksService } from '../../service/books.service';
import { BookInterface } from '../../models/models-bookInterface';
import { CreateBookComponent } from '../../components/create-book/create-book.component';
import { from } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers:[ BooksService]
})

export class HomeComponent implements OnInit {

    books: Array<BookInterface>;
    searchForm: FormGroup;
    isLogged = false;
    
    constructor(
        private router: Router,
        private bookService:BooksService, 
        private formBuilder: FormBuilder,
        private userService: UserService
    ){ }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            search: ['', Validators.required]
        })

        this.checkUser()

        if(!this.isLogged) {
            this.router.navigate(['/login']);
        } else {
            this.getAllBooks();
        }
    }

    checkUser() {
        if(this.userService.getCurrentUser() === null) {
            this.isLogged = false;
        } else {
            this.isLogged = true;
        }
    }

    searchBook() {
        if(isNullOrUndefined(this.searchForm.value.search) || this.searchForm.value.search.trim().length == 0) {
            this.getAllBooks(); 
            return;   
        }

        this.bookService.getBookById(this.searchForm.value.search).subscribe(
            result => {
                let book = result.libro;
                book.id = this.searchForm.value.search;
                this.books = Array(book)
            },
            error => {
                alert("An error ocurred " + error);
            } 
        )
    }

    getAllBooks() {
        this.bookService.getAllBooks()
            .subscribe(
                result => {
                    this.books = result.libros;
                },
                error => {
                    alert("An error ocurred " + error);
                }
            );
    }

    addBook() {
        this.router.navigate(['add-book']);
    };

    deleteBook(id: string) {
        this.bookService.delete(id).subscribe(
            result => {
                console.log("eliminado con exito");
                this.getAllBooks()
            },
            error => {
                alert("An error ocurred " + error);
            }
        );
    }

    editBook(id: string) {
        this.router.navigate(['edit-book/'+id]);
    }
}