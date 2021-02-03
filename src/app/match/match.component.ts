import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  hoveredTerritory: string;

  constructor(private route: ActivatedRoute)
  { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const matchId = Number(routeParams.get('matchId'));
  }

  onTerritoryHovered(territory: string) {
    this.hoveredTerritory = territory;
  }

}
