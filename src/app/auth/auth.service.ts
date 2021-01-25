import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {BehaviorSubject, Observable, ObservableInput, Subject} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import { AuthState } from './auth-state';
import { AppConfig } from '../app-config';

// noinspection SpellCheckingInspection
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly NAME_KEY = 'name';
  private readonly TOKEN_KEY = 'token';

  private authStateSubject: BehaviorSubject<AuthState>;
  public authState: Observable<AuthState>;

  constructor(private http: HttpClient) {
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

  private static errorHandler(error: HttpErrorResponse): ObservableInput<any> {
    if (!(error.error instanceof ErrorEvent)) {
      switch (error.error.status) {
        case 401:
        case 422:
          throw 'Credenziali invalide';
        case 409:
          throw 'Un giocatore con quel nome esiste già';
      }
    }

    console.error(error);
    throw 'Errore (vedi console del browser)';
  }

  authenticate(name: string, password: string): Observable<AuthState> {
    return this.http.post<{token: string}> (
      AppConfig.ApiRoot + 'players/auth',
      { name, password }
      )
      .pipe(
        map(value => new AuthState(name, value.token)),
        tap({
          next: next => this.authStateSubject.next(next),
          error: AuthService.errorHandler
        })
      );
  }

  signOn(name: string, password: string): Observable<any> {
    return this.http.post(
      AppConfig.ApiRoot + 'players',
      { name, password }
    )
    .pipe(catchError(AuthService.errorHandler));
  }

  unAuthenticate(): void {
    this.authStateSubject.next(new AuthState());
  }
}
