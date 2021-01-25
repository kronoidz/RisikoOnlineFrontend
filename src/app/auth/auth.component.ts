import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  name: string;
  password: string;
  action: 'signOn' | 'signIn';

  working = false;
  error: string = null;
  success: string = null;

  authenticatedUserName: string;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.authState.subscribe(
      value => {
        this.working = false;
        this.authenticatedUserName = value.name;
      }
    );
  }

  onSignOnClick(): void { this.action = 'signOn'; }
  onSignInClick(): void { this.action = 'signIn'; }

  onSubmit(): void {
    this.error = null;
    this.success = null;

    if (!this.name || !this.password) {
      this.error = 'Digita il nome del giocatore e la password';
      return;
    }

    this.working = true;

    let observable: Observable<any>;
    let successMessage: string;

    switch (this.action) {
      case 'signIn':
        observable = this.auth.authenticate(this.name, this.password);
        successMessage = 'Autenticazione completata';
        break;
      case 'signOn':
        observable = this.auth.signOn(this.name, this.password);
        successMessage = `Nuovo utente ${this.name} creato`;
        break;
    }

    observable
      .pipe(finalize(() => this.working = false))
      .subscribe({
        next: () => {
          this.success = successMessage;
        },
        error: error => {
          this.error = error;
          throw error;
        }});
  }

  onQuitClick($event: MouseEvent): void {
    this.error = null;
    this.success = null;

    $event.preventDefault();
    this.auth.unAuthenticate();
  }
}
