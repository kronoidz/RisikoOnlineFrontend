import {Component, OnInit} from '@angular/core';

import {MapConfiguration} from './conf/map-configuration';
import {MapColor} from './conf/map-color';
import {Territory} from '../../api/territory';

@Component({
  selector: 'app-map-test',
  template: '<p>{{selectedString}}</p>' +
    '<app-map [conf]="data" selectable="true" ' +
      '(onTerritorySelected)="selected = $event" ' +
      '(onTerritoryDeselected)="selected = null">' +
    '</app-map>',
  styles: ['app-map { display: block; margin: 0 auto; width: 80vw; }']
})
export class MapTestComponent implements OnInit {
  data = new MapConfiguration();
  selected: Territory;

  get selectedString() {
    return Territory[this.selected];
  };

  ngOnInit() {
    this.data.NorthAfrica.clickable = true;
    this.data.NorthAfrica.color = MapColor.Pink;

    this.data.India.clickable = true;
    this.data.India.color = MapColor.Red;

    this.data.Afghanistan.clickable = true;
    this.data.Afghanistan.color = MapColor.Green;
  }
}
