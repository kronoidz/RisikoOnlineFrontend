import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {InvitationService} from '../invitation.service';
import {Invitation} from '../invitation';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.component.html',
  styleUrls: ['./invitation-list.component.css']
})
export class InvitationListComponent implements OnInit, OnDestroy {

  @Input() type: 'incoming' | 'outgoing';
  working = false;
  invitations: Invitation[];
  errorOccurred: boolean;

  updateInterval;

  constructor(private invitationService: InvitationService)
  { }

  ngOnInit(): void {
    this.updateData();
    this.updateInterval = setInterval(this.updateData.bind(this), 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.updateInterval);
  }

  updateData(): void {
    this.errorOccurred = false;
    this.working = false;

    let observable: Observable<Invitation[]>;

    if (this.type === 'incoming') {
      observable = this.invitationService.getIncoming();
    }
    else {
      observable = this.invitationService.getOutgoing();
    }

    observable
      .pipe(finalize(() => this.working = false))
      .subscribe({
        next: value => this.invitations = value,
        error: () => this.errorOccurred = true
      });
  }

  accept(i: Invitation): void {
    this.working = true;
    this.invitationService.accept(i)
      .subscribe(() => {
        this.updateData();
      });
  }

  decline(i: Invitation): void {
    this.working = true;
    this.invitationService.decline(i)
      .subscribe(() => {
        this.updateData();
      });
  }
}
