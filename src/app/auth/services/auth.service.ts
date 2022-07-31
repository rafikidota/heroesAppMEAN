import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, User } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseURL;
  private _user!: User;

  constructor(private http: HttpClient) { }

  get user() {
    return { ...this._user };
  }

  loadUser(resp: AuthResponse) {
    localStorage.setItem('token', resp.token!);
    this._user = {
      uid: resp.uid!,
      name: resp.name!,
      email: resp.email!
    }
  }

  register(name: string, email: string, password: string) {
    const url = `${this.baseUrl}/auth/new`;
    const body = { name,email, password };
    return this.http.post<AuthResponse>(url, body).pipe(
      tap(resp => {
        if (resp.ok) {
          localStorage.setItem('token', resp.token!);
        }
      }),
      map(resp => resp.ok),
      catchError(err => of(err.error.msg))
    );
  }

  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth`;
    const body = { email, password };
    return this.http.post<AuthResponse>(url, body).pipe(
      tap(resp => {
        if (resp.ok) {
          localStorage.setItem('token', resp.token!);        
        }
      }),
      map(resp => resp.ok),
      catchError(err => of(err.error.msg))
    );
  }

  validateToken() {
    const url = `${this.baseUrl}/auth/renew`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.get<AuthResponse>(url, { headers }).pipe(
      map(resp => {
        this.loadUser(resp);
        return resp.ok;
      }),
      catchError(err => of(false))
    );
  }

  logout() {
    localStorage.clear();
  }

}
