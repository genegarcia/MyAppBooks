import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/app/service/books.service';
import { BookInterface } from 'src/app/models/models-bookInterface';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private booksService: BooksService) { }

  editForm: FormGroup;
  book: BookInterface;

  ngOnInit() {
    this.booksService.getBookById(this.activatedRoute.snapshot.paramMap.get("id")).subscribe(
      result => {
        this.book = result.libro;
        this.editForm = this.formBuilder.group({
          edicion: [this.book.edicion, Validators.required],
          resumen: [this.book.resumen, Validators.required],
          autor: [this.book.autor, Validators.required],
          nombre: [this.book.nombre, Validators.required],
        }); 
      }
    );
    
    this.editForm = this.formBuilder.group({
      edicion: ['', Validators.required],
      resumen: ['', Validators.required],
      autor: ['', Validators.required],
      nombre: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.editForm.invalid) {
      alert("Debe llenar todos los campos!")
      return;
    }

    this.booksService.edit(this.activatedRoute.snapshot.paramMap.get("id"), this.editForm.value).subscribe(
      result => this.router.navigate(["/home"])
    )
  }
  cancelar(){
    this.router.navigate(['home']);
  }

}
