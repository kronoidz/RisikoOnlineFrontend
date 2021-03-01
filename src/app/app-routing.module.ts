import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { MatchComponent } from './match/match.component';
import {ReinforcementComponent} from './match/reinforcement/reinforcement.component';
import {MapTestComponent} from './match/map/map-test.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent },
  { path: 'match/:matchId', component: MatchComponent },
  { path: 'match/:matchId/reinforcement', component: ReinforcementComponent },

  { path: 'test-map', component: MapTestComponent },

  { path: '', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
