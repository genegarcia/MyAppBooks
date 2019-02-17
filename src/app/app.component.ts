import { Component, OnInit } from '@angular/core';
import {UserService} from '../app/service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private userService: UserService,  private router: Router) { }

  title = 'my-biblioteca';
  isLogged = false;

  ngOnInit() {
    this.checkUser();
  }

  checkUser() {
    if(this.userService.getCurrentUser() === null) {
      this.isLogged = false;
    } else {
      this.isLogged = true;
    }
  }

  logout() {
    this.userService.logout()
    this.router.navigate(["/"]);
    location.reload()
  }
  

} 
