import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Subscription} from 'rxjs';

import { AuthService } from '../auth/auth.service';
import {Invitation} from './invitation';
import {InvitationService} from './invitation.service';
import {finalize} from 'rxjs/operators';
import {InvitationListComponent} from './invitation-list/invitation-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private authSubscription: Subscription;
  playerName: string;
  invitationReceiver: string;
  working = false;
  errorOccurred = false;

  constructor(private auth: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private invitationService: InvitationService)
  { }

  ngOnInit(): void {
    this.authSubscription = this.auth.authState.subscribe({
      next: value => {
        if (!value.isValid()) {
          // noinspection JSIgnoredPromiseFromCall
          this.router.navigate(['/auth']);
        }
        else {
          this.playerName = value.name;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onInvitationSubmit(outgoingList: InvitationListComponent): void {
    this.working = true;
    this.errorOccurred = false;
    this.invitationService.send(this.invitationReceiver)
      .pipe(finalize(() => {
        this.working = false;
        if (!this.errorOccurred) {
          this.invitationReceiver = '';
          outgoingList.updateData();
        }
      }))
      .subscribe({
        error: () => this.errorOccurred = true
      });
  }
}
