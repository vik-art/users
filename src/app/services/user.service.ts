import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../common/interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  create(user: User): Observable<User> {
    return this.http.post<User>(`${environment.databaseURL}/users.json`, user)
      .pipe(map((response) => {
        return {
          ...user,
          id: response.id,
        }
      }))
  }
}
