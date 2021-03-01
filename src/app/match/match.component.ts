import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api/api.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private api: ApiService)
  { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const matchId = Number(routeParams.get('matchId'));

    // If playerState is not initialized, go to reinforcement
    this.api.getMyState(matchId)
      .subscribe(
        state => {
          if (!state.isInitialized) {
            // noinspection JSIgnoredPromiseFromCall
            this.router.navigate([`match/${matchId}/reinforcement`]);
          }
        }
      );
  }

}
