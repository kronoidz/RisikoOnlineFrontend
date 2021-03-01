import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {ApiService} from '../../../api/api.service';
import {MapLegendItem} from './map-legend-item';

@Component({
  selector: 'app-map-legend',
  templateUrl: './map-legend.component.html',
  styleUrls: ['./map-legend.component.css']
})
export class MapLegendComponent {

  @Input() items: MapLegendItem[];

}
