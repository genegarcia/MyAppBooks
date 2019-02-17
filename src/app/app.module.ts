import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';

import {PeticionesService} from "./service/peticiones.services";



// Importar HttpClientModule
import {HttpClientModule} from '@angular/common/http';

/** importando componentes*/
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import {UserService} from "./service/user.service";
import { BooksService} from "./service/books.service"


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CreateBookComponent,
    EditBookComponent
    

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    AppRoutingModule,
    HttpClientModule, // cargamos el módulo en el array de imports
   
  ],
  providers: [UserService, BooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
