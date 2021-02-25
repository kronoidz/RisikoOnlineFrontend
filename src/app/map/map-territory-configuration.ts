import { MapColor } from './map-color';

export interface MapTerritoryConfiguration {
  color: MapColor;
  clickable: boolean;
  selected: boolean;
  text: string;
}
