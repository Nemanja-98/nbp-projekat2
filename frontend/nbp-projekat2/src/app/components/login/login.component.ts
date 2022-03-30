import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginCredentials = {username: "", password: ""};
  private destroy$: Subject<void> = new Subject<void>();

  constructor( private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void{
    if(this.loginCredentials.username === "") {
      alert("Please enter your username!")
      return;
    }

    if(this.loginCredentials.password === "") {
      alert("Please enter your password!")
      return;
    }

    this.authService.login(this.loginCredentials)
    .pipe(takeUntil(this.destroy$))
    .subscribe( response => {
      localStorage.setItem("username", response.username);
      this.router.navigate(['']);
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
