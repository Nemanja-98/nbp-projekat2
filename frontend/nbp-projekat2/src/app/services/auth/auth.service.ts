import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string = environment.connectionString + "Auth/";

  constructor(private http: HttpClient) { }

  login(user: any): Observable<User> {
    const urlLogin = this.url + "login";
    return this.http.post<User>(urlLogin, user, environment.httpOptions);
  }
}
