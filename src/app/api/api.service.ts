import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, OperatorFunction, throwError} from 'rxjs';
import {ApiError} from './api-error';
import {Invitation} from './invitation';
import {AppConfig} from '../app-config';
import {catchError} from 'rxjs/operators';
import {Match} from './match';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient)
  { }


  /************* ERROR HANDLING ****************/


  private static isApiError(error: any): boolean {
    return (error as ApiError).isApiError === true;
  }

  private static handleHttpError(error: HttpErrorResponse): Observable<never> {
    if (error instanceof ErrorEvent) {
      // Client-side or network error
      return throwError('Errore client o di rete');
    }
    else {
      // Server returned error response
      if (ApiService.isApiError(error.error)) {
        return throwError((error.error as ApiError).description);
      }

      // Other server-side error
      return throwError('Errore server');
    }
  }

  public static catchHttpError(): OperatorFunction<any, any> {
    return catchError(ApiService.handleHttpError);
  }


  /************* INVITATIONS ****************/


  private getInvitations(from: 'incoming' | 'outgoing'): Observable<Invitation[]> {
    return this.http
      .get<Invitation[]>(AppConfig.ApiRoot + 'invitations/' + from)
      .pipe(ApiService.catchHttpError());
  }

  getIncomingInvitations(): Observable<Invitation[]> {
    return this.getInvitations('incoming');
  }

  getOutgoingInvitations(): Observable<Invitation[]> {
    return this.getInvitations('outgoing');
  }

  private answerInvitation(invitation: Invitation, answer: 'accept' | 'decline'): Observable<any> {
    return this.http
      .get(AppConfig.ApiRoot + `invitations/incoming/${invitation.id}/${answer}`)
      .pipe(ApiService.catchHttpError());
  }

  acceptInvitation(invitation: Invitation): Observable<any> {
    return this.answerInvitation(invitation, 'accept');
  }

  declineInvitation(invitation: Invitation): Observable<any> {
    return this.answerInvitation(invitation, 'decline');
  }

  invite(receiver: string): Observable<Invitation> {
    return this.http.post(
      AppConfig.ApiRoot + 'invitations/outgoing',
      { receiver }
      )
      .pipe(ApiService.catchHttpError());
  }


  /************ MATCHES **********************/

  getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(AppConfig.ApiRoot + 'match')
      .pipe(ApiService.catchHttpError());
  }

  createMatch(): Observable<Match> {
    return this.http.post<Match>(
      AppConfig.ApiRoot + 'match',
      null
      )
      .pipe(ApiService.catchHttpError());
  }
}
