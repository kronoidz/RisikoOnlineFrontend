import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { concat, iif, merge } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { PlayerStateDto } from '../../api/player-state-dto';
import { TerritoryOwnershipDto } from '../../api/territory-ownership-dto';
import { Territory } from '../../api/territory';
import { MapConfiguration } from '../map/conf/map-configuration';
import { ApiService } from '../../api/api.service';
import { MatchDto } from '../../api/match-dto';

@Component({
  selector: 'app-reinforcement',
  templateUrl: './reinforcement.component.html',
  styleUrls: ['./reinforcement.component.css']
})
export class ReinforcementComponent implements OnInit {
  working = true;
  error: string;

  mapConf = new MapConfiguration();

  selectedOwnershipUpdated: TerritoryOwnershipDto;
  selectedOwnershipOriginal: TerritoryOwnershipDto;
  selectedTerritoryName: string;

  remainingArmies: number;
  match: MatchDto;
  matchId: number;
  state: PlayerStateDto;
  originalOwnerships: TerritoryOwnershipDto[];
  updatedOwnerships: TerritoryOwnershipDto[];

  constructor(private route: ActivatedRoute,
              private api: ApiService)
  {}

  ngOnInit(): void {
    const matchId = +this.route.snapshot.paramMap.get('matchId');
    this.matchId = matchId;

    const stateObservable = this.api.getMyState(matchId)
      .pipe(tap({
        next: next => this.state = next
      }));

    const matchObservable = this.api.getMatch(matchId)
      .pipe(
        tap({ next: next => this.match = next })
      );

    const ownershipsObservable =
      iif(() => !!this.match.currentPlayer,
        this.api.getMatchOwnerships(matchId),
        this.api.getMyOwnerships(matchId)
      )
      .pipe(tap({
        next: next => {
          this.originalOwnerships = next;
          this.updatedOwnerships = next.map(o => {
            const clone = Object.assign({}, o);
            if (clone.armies === 0)
              clone.armies = 1;
            return clone;
          });
        }
      }));

    concat(merge(stateObservable, matchObservable), ownershipsObservable)
      .subscribe({
        error: error => this.error = error,
        complete: () => {
          this.working = false;
          this.initMapConf();
          this.updateRemainingArmies();
        }
      });
  }

  onDone(): void {
    this.working = true;
    this.api.postOwnerships(this.match.id, this.updatedOwnerships)
      .subscribe({
        complete: () => this.working = false,
        error: e => this.error = e
      });
  }

  onTerritorySelected(territory: Territory): void {
    this.selectedOwnershipUpdated = this.updatedOwnerships.find(o => o.territory === territory);
    this.selectedOwnershipOriginal = this.originalOwnerships.find(o => o.territory === territory);
    this.selectedTerritoryName = Territory[territory];
  }

  onTerritoryDeselected(): void {
    this.selectedOwnershipUpdated = null;
    this.selectedOwnershipOriginal = null;
    this.selectedTerritoryName = null;
  }

  private initMapConf(): void {
    for (const ownership of this.updatedOwnerships) {
      if (ownership.player === this.state.player) {
        const conf = this.mapConf.get(ownership.territory);
        conf.color = this.match.players.indexOf(this.state.player);
        conf.clickable = true;
        conf.text = ownership.armies.toString();
      }
    }
  }

  onArmyNumberChange(): void {
    this.updateRemainingArmies();
    this.updateSelectedTerritoryText();
  }

  updateRemainingArmies(): void {
    this.remainingArmies = this.updatedOwnerships.reduce(
      (accumulator, updatedOwnership, i) => {
        const originalOwnership = this.originalOwnerships[i];
        return accumulator - (updatedOwnership.armies - originalOwnership.armies);
      }, this.state.unplacedArmies
    );
  }

  updateSelectedTerritoryText(): void {
    this.mapConf.get(this.selectedOwnershipUpdated.territory)
          .text = this.selectedOwnershipUpdated.armies.toString();
  }
}
