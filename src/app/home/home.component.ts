import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { InvitationService } from './invitation.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private authSubscription: Subscription;
  playerName: string;

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
}
