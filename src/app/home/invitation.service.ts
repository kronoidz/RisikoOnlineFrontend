import { Injectable } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';
import {Invitation} from './invitation';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../app-config';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  constructor(private http: HttpClient)
  { }

  getIncoming(): Observable<Invitation[]> {
    return this.http.get<Invitation[]>(AppConfig.ApiRoot + 'invitations/incoming');
  }

  getOutgoing(): Observable<Invitation[]> {
    return this.http.get<Invitation[]>(AppConfig.ApiRoot + 'invitations/outgoing');
  }

  accept(i: Invitation): Observable<any> {
    return this.http.get(AppConfig.ApiRoot + `invitations/incoming/${i.id}/accept`);
  }

  decline(i: Invitation): Observable<any> {
    return this.http.get(AppConfig.ApiRoot + `invitations/incoming/${i.id}/decline`);
  }

  send(receiver: string): Observable<Invitation> {
    return this.http.post<Invitation>(
      AppConfig.ApiRoot + 'invitations/outgoing',
      { receiver }
    );
  }
}
