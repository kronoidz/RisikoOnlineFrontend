import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Territory} from '../api/territory';
import {MapTerritoryConfiguration} from './map-territory-configuration';
import {MapColor} from './map-color';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.svg',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  @Input() conf: Map<string, MapTerritoryConfiguration>;

  @Output() territoryHover = new EventEmitter<string>();
  @Output() territoryClick = new EventEmitter<string>();

  getColor(territory: HTMLElement): string {
    return this.conf ? MapColor[this.conf.get(territory.id).color] : null;
  }

  isClickable(territory: HTMLElement): boolean {
    return this.conf ? this.conf.get(territory.id).clickable : false;
  }

  isSelected(territory: HTMLElement): boolean {
    return this.conf ? this.conf.get(territory.id).selected : false;
  }

  onMouseEnter(territory: HTMLElement): void {
    if (this.isClickable(territory)) {
      this.territoryHover.emit(territory.id);
    }
  }

  onMouseOutMap(): void {
    this.territoryHover.emit('');
  }

  onClick(territory: HTMLElement): void {
    if (this.isClickable(territory)) {
      this.territoryClick.emit(territory.id);
    }
  }

  getText(territory: HTMLElement): string {
    return this.conf ? this.conf.get(territory.id).text : null;
  }

}
