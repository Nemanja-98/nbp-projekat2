import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForRegistry: User = new User("","","","","");
  loginCredentials = {username: "", password: ""};
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register(): void {
    if(this.userForRegistry.username === "") {
      alert("Please enter your username!")
      return;
    }
    if(this.userForRegistry.password === "") {
      alert("Please enter your username!")
      return;
    }
    if(this.userForRegistry.name === "") {
      alert("Please enter your username!")
      return;
    }
    if(this.userForRegistry.surname === "") {
      alert("Please enter your username!")
      return;
    }
    if(this.userForRegistry.location === "") {
      alert("Please enter your username!")
      return;
    }

    this.userService.createNewUser(this.userForRegistry)
    .pipe(takeUntil(this.destroy$))
    .subscribe( response => {
      this.loginCredentials.username = this.userForRegistry.username;
      this.loginCredentials.password = this.userForRegistry.password;
      this.authService.login(this.loginCredentials)
      .pipe(takeUntil(this.destroy$))
      .subscribe( response2 => {
        localStorage.setItem("username", response2.username);
        this.router.navigate(['']);
      })
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
