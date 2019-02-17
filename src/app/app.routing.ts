import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Importar Componentes

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from  './components/login/login.component';
import { CreateBookComponent } from './components/create-book/create-book.component'
import { EditBookComponent } from './components/edit-book/edit-book.component';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'add-book', component: CreateBookComponent},
    {path: 'edit-book/:id', component: EditBookComponent}

];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders =  RouterModule.forRoot(appRoutes);