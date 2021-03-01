import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { MatchComponent } from './match/match.component';
import { MapComponent } from './match/map/map.component';
import { ReinforcementComponent } from './match/reinforcement/reinforcement.component';
import { MapLegendComponent } from './match/map/map-legend/map-legend.component';
import { MapTestComponent } from './match/map/map-test.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    MatchComponent,
    MapComponent,
    ReinforcementComponent,
    MapLegendComponent,
    MapTestComponent,
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
