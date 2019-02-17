import { Component, OnInit } from '@angular/core';

import { PeticionesService } from '../../service/peticiones.services';
import { UserService } from '../../service/user.service'
import { UserInterface } from '../../models/models-interfaces';

import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Router } from '@angular/router';



@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers:[ UserService]
})


export class LoginComponent implements OnInit {
    constructor(private authService: UserService, private router: Router){}
        private user: UserInterface = {
            username: "",
            password: ""
        };

    ngOnInit(){}

    onLogin(form: NgForm){
        if(form.valid){
            return this.authService
            .loginuser(this.user.username, this.user.password)
            .subscribe( 
                data => {
                    console.log(data);
                    const token = data.usuario.access_token;
                    this.authService.setToken(token);
                    this.authService.setUser(this.user)
                    this.router.navigate(['/home']);
                    location.reload()
                },
                error => console.log(error)
            );
        }else{
            this.OnisError();
        }
    }

    OnisError(): void {
        alert("error")    
    }
    
}