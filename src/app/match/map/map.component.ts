import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MapConfiguration } from './conf/map-configuration';
import { Territory } from '../../api/territory';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.svg',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  @Input() conf: MapConfiguration;
  @Input() selectable = false;

  // These events are only emitted for clickable territories
  // onTerritory(De)Selected are only emitted with selectable == true
  @Output() onTerritorySelected = new EventEmitter<Territory>();
  @Output() onTerritoryDeselected = new EventEmitter<Territory>();
  @Output() onMouseEnterTerritory = new EventEmitter<Territory>();
  @Output() onMouseLeaveTerritory = new EventEmitter<Territory>();
  @Output() onTerritoryClick = new EventEmitter<Territory>();

  selectedTerritory: Territory;

  onMouseEnter(territory: Territory): void {
    const territoryConf = this.conf.get(territory);

    if (territoryConf.clickable) {
      this.onMouseEnterTerritory.emit(territory);
    }
  }

  onMouseLeave(territory: Territory): void {
    const territoryConf = this.conf.get(territory);

    if (territoryConf.clickable) {
      this.onMouseLeaveTerritory.emit(territory);
    }
  }

  onClick(territory: Territory): void {
    const territoryConf = this.conf.get(territory);

    if (territoryConf.clickable) {
      this.onTerritoryClick.emit(territory);

      if (this.selectable) {
        if (this.selectedTerritory) {
          this.onTerritoryDeselected.emit(this.selectedTerritory);
        }

        if (this.selectedTerritory !== territory) {
          this.selectedTerritory = territory;
          this.onTerritorySelected.emit(territory);
        }
        else {
          this.selectedTerritory = null;
        }
      }
    }
  }
}
