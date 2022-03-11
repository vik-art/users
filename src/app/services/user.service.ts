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
          id: response.name,
        }
      }))
  }

  getAll(): Observable<User[] | null> {
    return this.http.get<User[]>(`${environment.databaseURL}/users.json`)
      .pipe(
        map((response: { [key: string]: any }) => {
          if (response) {
            return Object
              .keys(response)
              .map(key => ({
                ...response[key],
                id: key,
                date: new Date(response[key].date)
              }))
          } else {
            return null
          }
        }
        )
    )
  }

  remove(id: string) {
       return this.http.delete<void>(`${environment.databaseURL}/users/${id}.json`)
    }

  updateItem(user: User) {
    return this.http.patch<User>(`${environment.databaseURL}/users/${user.id}.json`, user)
  }
}
