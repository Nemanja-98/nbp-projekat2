import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:string = environment.connectionString + "User/";

  constructor(private http: HttpClient) { }

  getMyInformations(username: string | null): Observable<User>{

    const urlGetUser = this.url + "GetUser/" + username;
    return this.http.get<User>(urlGetUser, environment.httpOptions);
  }

  updateUser(user: User): Observable<User> {

    const urlUpdateUser = this.url + "UpdateUser";
    return this.http.put<User>(urlUpdateUser, user, environment.httpOptions);
  }
}
