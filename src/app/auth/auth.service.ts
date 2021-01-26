import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {AuthState} from './auth-state';
import {AppConfig} from '../app-config';
import {ApiErrorService} from '../error/api-error.service';

// noinspection SpellCheckingInspection
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly NAME_KEY = 'name';
  private readonly TOKEN_KEY = 'token';

  private authStateSubject: BehaviorSubject<AuthState>;
  public authState: Observable<AuthState>;

  constructor(private http: HttpClient, private apiError: ApiErrorService) {
    const name = localStorage.getItem(this.NAME_KEY);
    const token = localStorage.getItem(this.TOKEN_KEY);

    const initialState = new AuthState(name, token);

    this.authStateSubject = new BehaviorSubject<AuthState>(initialState);
    this.authState = this.authStateSubject.asObservable();

    this.authStateSubject.subscribe(value => {
      if (value.isValid()) {
        localStorage.setItem(this.NAME_KEY, value.name);
        localStorage.setItem(this.TOKEN_KEY, value.token);
      }
      else {
        localStorage.removeItem(this.NAME_KEY);
        localStorage.removeItem(this.TOKEN_KEY);
      }
    });
  }

  authenticate(name: string, password: string): Observable<AuthState> {
    return this.http.post<{token: string}> (
      AppConfig.ApiRoot + 'players/auth',
      { name, password }
      )
      .pipe(
        map(value => new AuthState(name, value.token)),
        tap(next => this.authStateSubject.next(next)),
        catchError(this.apiError.apiErrorHandler())
      );
  }

  signOn(name: string, password: string): Observable<any> {
    return this.http.post(
      AppConfig.ApiRoot + 'players',
      { name, password }
    )
    .pipe(catchError(this.apiError.apiErrorHandler()));
  }

  unAuthenticate(): void {
    this.authStateSubject.next(new AuthState());
  }
}
