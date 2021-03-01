import {Component, OnInit} from '@angular/core';

import {Territory} from '../../api/territory';
import {ApiService} from '../../api/api.service';
import {AuthService} from '../../auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';
import {MapColor} from '../map/conf/map-color';
import {concat, iif, merge} from 'rxjs';
import {TerritoryOwnershipDto} from '../../api/territory-ownership-dto';
import {MapConfiguration} from '../map/conf/map-configuration';
import {MapLegendItem} from '../map/map-legend/map-legend-item';
import {MatchDto} from '../../api/match-dto';
import {PlayerStateDto} from '../../api/player-state-dto';

@Component({
  selector: 'app-reinforcement',
  templateUrl: './reinforcement.component.html',
  styleUrls: ['./reinforcement.component.css']
})
export class ReinforcementComponent /*implements OnInit*/ {
  /*
  mapConfiguration = new MapConfiguration();
  legendItems: MapLegendItem[] = [];
  playerColor: string;
  working = true;
  error: string;
  selectedOwnership: TerritoryOwnershipDto;

  get remainingArmies() {
    return this.playerState.unplacedArmies - this.placedArmies;
  }

  get selectedTerritoryName() {
    return Territory[this.selectedOwnership.territory];
  }

  get selectedTerritoryMinArmies() {
    const prevArmies = this.previousOwnerships
      .find(o => o.territory === this.selectedOwnership.territory)
      .armies;
    return prevArmies === 0 ? 1 : prevArmies;
  }

  private myName: string;
  private match: MatchDto;
  private playerState: PlayerStateDto;
  private previousOwnerships: TerritoryOwnershipDto[];
  private ownerships: TerritoryOwnershipDto[];

  private get placedArmies() {
    let placedArmies = 0;
    for (let i = 0; i < this.ownerships.length; i++) {
      placedArmies += this.ownerships[i].armies - this.previousOwnerships[i].armies;
    }
    return placedArmies;
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private auth: AuthService,
              private api: ApiService)
  { }

  ngOnInit(): void {
    this.myName = this.auth.currentAuthState.name;
    const routeParams = this.route.snapshot.paramMap;
    const matchId = Number(routeParams.get('matchId'));

    // Get player state
    const playerStateObservable = this.api.getMyState(matchId)
      .pipe(tap(next => {
        this.playerState = next;
      }));

    // If initialized, get all ownerships. Otherwise, just mine
    const ownershipsObservable = iif(
      () => this.playerState.isInitialized,
      this.api.getMatchOwnerships(matchId),
      this.api.getMyOwnerships(matchId)
    )
      .pipe(tap(next => {
        this.previousOwnerships = next;
        this.ownerships = next.map(v => Object.assign({}, v)); // Shallow copy

        let i = 0;
        for (const ownership of next) {

          // Place 1 army in all territories automatically
          if (!this.playerState.isInitialized) {
            ownership.armies = 1;
          }

          // Configure map
          const territoryConf = this.mapConfiguration.getTerritoryConfiguration(ownership.territory);
          territoryConf.color = this.match.players.indexOf(ownership.player) as MapColor;
          territoryConf.selectable = ownership.player === this.myName;
          territoryConf.clickable = territoryConf.selectable;
          territoryConf.text = ownership.armies.toString();

          // Configure legend
          if (i === 0 || next[i - 1].player !== ownership.player)
            this.legendItems.push({ color: territoryConf.color, text: ownership.player })

          i++;
        }
      }));

    const stateOwnershipsObservable = concat(playerStateObservable, ownershipsObservable);

    // Get match
    const matchObservable = this.api.getMatch(matchId)
      .pipe(tap(next => this.match = next));

    merge(stateOwnershipsObservable, matchObservable)
      .pipe(catchError(err => this.error = err))
      .subscribe({
        complete: () => this.working = false
      });
  }

  onSubmitArmies() {
    this.working = true;

    this.api.postInitialOwnerships(this.match.id, this.ownerships)
      .pipe(catchError(err => this.error = err))
        .subscribe({
          complete: () => this.working = false
        });
  }

  onTerritorySelected(territory: Territory): void {
    this.selectedOwnership = this.ownerships.find(o => o.territory === territory);
    this.mapConfiguration.setText(territory, '?');
  }

  onTerritoryDeselected(territory: Territory): void {
    this.mapConfiguration.setText(
      this.selectedOwnership.territory,
      this.selectedOwnership.armies.toString()
    );
    this.selectedOwnership = null;
  }

   */
}
