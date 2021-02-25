import {Injectable} from '@angular/core';
import {Territory} from '../api/territory';
import {MapTerritoryConfiguration} from './map-territory-configuration';
import {MapColor} from './map-color';
import {TerritoryOwnershipDto} from '../api/territory-ownership-dto';

@Injectable({
  providedIn: 'root'
})
export class MapConfigurationService {

  // Makes a map configuration for the initial reinforcement phase of the game
  makeInitialReinforcement (myOwnerships: TerritoryOwnershipDto[],
                            color: MapColor,
                            selected: Territory | null = null)
    : Map<string, MapTerritoryConfiguration>
  {
    const arr = Object.keys(Territory)
      .map(
        territory => {
          const ownership = myOwnerships.find(o => o.territory === Territory[territory]);
          const enabled: boolean = ownership !== undefined;
          const conf: MapTerritoryConfiguration = {
            color: enabled ? color : MapColor.Gray,
            selected: selected ? Territory[territory] === selected : false,
            clickable: enabled,
            text: enabled ? ownership.armies.toString() : null
          };
          return [ territory, conf ] as [string, MapTerritoryConfiguration];
        }
      );
    return new Map<string, MapTerritoryConfiguration>(arr);
  }

}
