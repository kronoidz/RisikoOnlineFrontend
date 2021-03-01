import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, OperatorFunction, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {ApiError} from './api-error';
import {AppConfig} from '../app-config';
import {PlayerStateDto} from './player-state-dto';
import {TerritoryOwnershipDto} from './territory-ownership-dto';
import {InvitationDto} from './invitation-dto';
import {MatchDto} from './match-dto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient)
  { }


  /************* ERROR HANDLING ****************/


  private static isApiError(error: any): boolean {
    return error && (error as ApiError).isApiError === true;
  }

  private static handleHttpError(error: HttpErrorResponse): Observable<never> {
    if (error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('Client-side or network error', error);
      return throwError('Errore client o di rete');
    }
    else {
      // Server returned error response
      if (ApiService.isApiError(error.error)) {
        console.error('API error', error.error);
        return throwError((error.error as ApiError).description);
      }

      // Other server-side error
      console.error('Server-side error', error);
      return throwError('Errore server');
    }
  }

  public static catchHttpError(): OperatorFunction<any, any> {
    return catchError(ApiService.handleHttpError);
  }


  /************* INVITATIONS ****************/


  private getInvitations(from: 'incoming' | 'outgoing'): Observable<InvitationDto[]> {
    return this.http
      .get<InvitationDto[]>(AppConfig.ApiRoot + 'invitations/' + from)
      .pipe(ApiService.catchHttpError());
  }

  getIncomingInvitations(): Observable<InvitationDto[]> {
    return this.getInvitations('incoming');
  }

  getOutgoingInvitations(): Observable<InvitationDto[]> {
    return this.getInvitations('outgoing');
  }

  private answerInvitation(invitation: InvitationDto, answer: 'accept' | 'decline'): Observable<any> {
    return this.http
      .get(AppConfig.ApiRoot + `invitations/incoming/${invitation.id}/${answer}`)
      .pipe(ApiService.catchHttpError());
  }

  acceptInvitation(invitation: InvitationDto): Observable<any> {
    return this.answerInvitation(invitation, 'accept');
  }

  declineInvitation(invitation: InvitationDto): Observable<any> {
    return this.answerInvitation(invitation, 'decline');
  }

  invite(receiver: string): Observable<InvitationDto> {
    return this.http.post(
      AppConfig.ApiRoot + 'invitations/outgoing',
      { receiver }
      )
      .pipe(ApiService.catchHttpError());
  }


  /************ MATCHES **********************/

  getMatches(): Observable<MatchDto[]> {
    return this.http.get<MatchDto[]>(AppConfig.ApiRoot + 'matches')
      .pipe(ApiService.catchHttpError());
  }

  getMatch(id: number): Observable<MatchDto> {
    return this.http.get<MatchDto>(AppConfig.ApiRoot + `matches/${id}`)
      .pipe(ApiService.catchHttpError());
  }

  createMatch(): Observable<MatchDto> {
    return this.http.post<MatchDto>(
      AppConfig.ApiRoot + 'matches',
      null
      )
      .pipe(ApiService.catchHttpError());
  }

  getMatchOwnerships(match: number): Observable<TerritoryOwnershipDto[]> {
    return this.http.get<TerritoryOwnershipDto[]>(
      AppConfig.ApiRoot + `matches/${match}/ownerships`
    )
      .pipe(ApiService.catchHttpError());
  }

  /************* PLAYER STATE ****************/

  getMyState(match: number): Observable<PlayerStateDto> {
    return this.http.get<PlayerStateDto>(AppConfig.ApiRoot + `states/${match}`)
      .pipe(ApiService.catchHttpError());
  }

  getMyOwnerships(match: number): Observable<TerritoryOwnershipDto[]> {
    return this.http.get<TerritoryOwnershipDto[]>(
      AppConfig.ApiRoot + `states/${match}/ownerships`
      )
      .pipe(ApiService.catchHttpError());
  }

  postOwnerships(match: number, owns: TerritoryOwnershipDto[]): Observable<any> {
    return this.http.post(AppConfig.ApiRoot + `states/${match}/ownerships`, owns)
      .pipe(ApiService.catchHttpError());
  }

}
