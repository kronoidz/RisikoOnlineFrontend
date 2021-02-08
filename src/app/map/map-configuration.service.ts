import {Injectable} from '@angular/core';
import {Territory} from '../api/territory';
import {MapTerritoryConfiguration} from './map-territory-configuration';
import {MapColor} from './map-color';

@Injectable({
  providedIn: 'root'
})
export class MapConfigurationService {

  // Makes a map configuration for the initial reinforcement phase of the game
  makeInitialReinforcement(myTerritories: Territory[], color: MapColor, selected: Territory | null = null)
    : Map<string, MapTerritoryConfiguration>
  {
    const arr = Object.keys(Territory)
      .map(
        territory => {
          const enabled = myTerritories.includes(Territory[territory]);
          const conf: MapTerritoryConfiguration = {
            color: enabled ? color : MapColor.Gray,
            selected: selected ? Territory[territory] === selected : false,
            clickable: enabled,
          };
          return [ territory, conf ] as [string, MapTerritoryConfiguration];
        }
      );
    return new Map<string, MapTerritoryConfiguration>(arr);
  }

}
