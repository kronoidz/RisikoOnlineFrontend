import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {merge, Subscription} from 'rxjs';
import {catchError, finalize, map, tap} from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import {Invitation} from '../api/invitation';
import {ApiService} from '../api/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private authSubscription: Subscription;

  myName: string;

  outgoingInvitations: Invitation[];
  incomingInvitations: Invitation[];

  canCreateMatch = false;
  invitationReceiverName: string;

  updateError: string;
  sendInvitationError: string;
  acceptDeclineError: string;

  working = false;

  constructor(private auth: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private api: ApiService)
  { }

  ngOnInit(): void {
    this.authSubscription = this.auth.authState.subscribe({
      next: value => {
        if (!value.isValid()) {
          // noinspection JSIgnoredPromiseFromCall
          this.router.navigate(['/auth']);
        }
        else {
          this.myName = value.name;
        }
      }
    });

    this.update();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  update(): void {
    this.updateError = null;
    this.working = true;

    const observables = [];

    observables.push(
      this.api.getOutgoingInvitations()
        .pipe(
          map(next => {
            const acceptedInvitations = next.filter(i => i.accepted);
            this.canCreateMatch = acceptedInvitations.length >= 2;
            return next.sort(
              a => a.accepted ? -1 :
                (a.accepted === false ? 0 : 1)
            );
          }),
          tap(next => this.outgoingInvitations = next)
        )
    );

    observables.push(
      this.api.getIncomingInvitations()
        .pipe(
          map(next => next.sort(
              a => a.accepted === null ? -1 :
                (a.accepted === true ? 0 : 1))
          ),
          tap(next => this.incomingInvitations = next)
        )
    );

    merge(...observables)
      .pipe(
        finalize(() => this.working = false),
        catchError(error => this.updateError = error)
      )
      .subscribe();
  }

  getInvitationClassName(invitation: Invitation): string {
    if (invitation.accepted === true)
      return 'accepted';

    if (invitation.accepted === null)
      return 'pending';

    return 'declined';
  }

  getOutgoingInvitationStatus(invitation: Invitation): string {
    if (invitation.accepted === true)
      return 'Ha accettato';

    if (invitation.accepted === null)
      return 'In attesa...';

    return 'Ha rifiutato';
  }

  getIncomingInvitationsStatus(invitation: Invitation): string | undefined {
    if (invitation.accepted)
      return 'Hai accettato';

    if (invitation.accepted === false)
      return 'Hai rifiutato';
  }

  onCreateMatch(): void {
    throw 'Not implemented';
  }

  onInvitePlayer(): void {
    this.sendInvitationError = null;
    this.working = true;

    this.api.invite(this.invitationReceiverName)
      .pipe(
        finalize(this.update.bind(this)),
        finalize(() => this.working = false),
        catchError(error => this.sendInvitationError = error)
      )
      .subscribe();
  }

  onAccept(invitation: Invitation): void {
    this.acceptDeclineError = null;
    this.working = true;

    this.api.acceptInvitation(invitation)
      .pipe(
        finalize(this.update.bind(this)),
        finalize(() => this.working = false),
        catchError(error => this.acceptDeclineError = error)
      )
      .subscribe();
  }

  onDecline(invitation: Invitation): void {
    this.acceptDeclineError = null;
    this.working = true;

    this.api.declineInvitation(invitation)
      .pipe(
        finalize(this.update.bind(this)),
        finalize(() => this.working = false),
        catchError(error => this.acceptDeclineError = error)
      )
      .subscribe();
  }
}
