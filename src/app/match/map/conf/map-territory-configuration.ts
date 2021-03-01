import { MapColor } from './map-color';
import { Territory } from '../../../api/territory';

export class MapTerritoryConfiguration {
  clickable = false;
  text: string = null;
  color = MapColor.Gray;

  constructor(public readonly territory: Territory)
  { }

  getColorString(): string {
    return MapColor[this.color];
  }
}
