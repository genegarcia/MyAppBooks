import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";

import {Router} from "@angular/router";
import { NgForm } from '@angular/forms';

import { BooksService } from '../../service/books.service';
import { BookInterface } from '../../models/models-bookInterface';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private booksService: BooksService) { }
  
    addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      edicion: ['', Validators.required],
      resumen: ['', Validators.required],
      autor: ['', Validators.required],
      nombre: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.addForm.invalid) {
      alert("Debe llenar todos los campos!")
      return;
    }
    this.booksService.createBook(this.addForm.value)
      .subscribe( data => {
        console.log(data);
        this.router.navigate(['home']);
      });
  }
  cancelar(){
    this.router.navigate(['home']);
  }
}
