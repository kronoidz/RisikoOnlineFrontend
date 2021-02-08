import {Component, OnInit} from '@angular/core';

import {Territory} from '../../api/territory';
import {MapTerritoryConfiguration} from '../../map/map-territory-configuration';
import {MapConfigurationService} from '../../map/map-configuration.service';
import {ApiService} from '../../api/api.service';
import {AuthService} from '../../auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map, tap} from 'rxjs/operators';
import {MapColor} from '../../map/map-color';
import {merge} from 'rxjs';
import {TerritoryOwnershipDto} from '../../api/territory-ownership-dto';

@Component({
  selector: 'app-reinforcement',
  templateUrl: './reinforcement.component.html',
  styleUrls: ['./reinforcement.component.css']
})
export class ReinforcementComponent implements OnInit {
  mapConf: Map<string, MapTerritoryConfiguration>;
  error: string;
  ownerships: TerritoryOwnershipDto[];
  playerColor: string;

  selectedOwnership: TerritoryOwnershipDto;
  private unplacedArmies: number;
  private matchId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private auth: AuthService,
              private api: ApiService,
              private mapConfService: MapConfigurationService)
  { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const matchId = Number(routeParams.get('matchId'));
    this.matchId = matchId;

    // Get number of armies to place
    const playerArmiesObservable = this.api.getMyState(matchId)
      .pipe(
        tap(state => this.unplacedArmies = state.unplacedArmies)
      );

    // Get player ownerships
    const playerOwnershipsObservable = this.api.getMyOwnerships(matchId)
      .pipe(
        tap(
          O => {
            this.ownerships = O.map(o => {
              o.armies++;
              return o;
            });
          }
        )
      );

    // Get player color
    const playerColorObservable = this.api.getMatch(matchId)
      .pipe(
        tap(match => {
          const playerIndex = match.players.indexOf(this.auth.currentAuthState.name);
          this.playerColor = MapColor[playerIndex];
        })
      );

    const O = merge(playerArmiesObservable, playerOwnershipsObservable, playerColorObservable);
    O.subscribe(
      {
        complete: () => {
          this.mapConf =
            this.mapConfService
              .makeInitialReinforcement(
                this.ownerships.map(o => o.territory),
                MapColor[this.playerColor]
              );
        },
        error: error => this.error = error
      }
    );
  }

  getRemainingArmies(): number {
    return this.ownerships?.reduce(
      (p, a) => p - a.armies, this.unplacedArmies ?? 0
    );
  }

  onTerritoryClick(territory: string) {
    this.selectedOwnership =
      (!this.selectedOwnership || this.selectedOwnership.territory !== Territory[territory]) ?
        this.ownerships.find(o => o.territory === Territory[territory]) :
        null;

    this.mapConf =
      this.mapConfService
        .makeInitialReinforcement(
          this.ownerships.map(o => o.territory),
          MapColor[this.playerColor],
          this.selectedOwnership?.territory
        );
  }

  getSelectedTerritory(): string {
    return Territory[this.selectedOwnership.territory as number];
  }

  onSubmitArmies() {
    this.api.postInitialOwnerships(this.matchId, this.ownerships)
      .subscribe(
        () => this.router.navigate([`/match/${this.matchId}`]),
        e => this.error = e
      );
  }
}
