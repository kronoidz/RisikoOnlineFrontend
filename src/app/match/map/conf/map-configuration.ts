import { MapTerritoryConfiguration } from './map-territory-configuration';
import { Territory } from '../../../api/territory';

export class MapConfiguration {

  // North America   9
  Alaska = new MapTerritoryConfiguration(Territory.Alaska);
  Alberta = new MapTerritoryConfiguration(Territory.Alberta);
  CentralAmerica = new MapTerritoryConfiguration(Territory.CentralAmerica);
  EasternUnitedStates = new MapTerritoryConfiguration(Territory.EasternUnitedStates);
  Greenland = new MapTerritoryConfiguration(Territory.Greenland);
  NorthwestTerritory = new MapTerritoryConfiguration(Territory.NorthwestTerritory);
  Ontario = new MapTerritoryConfiguration(Territory.Ontario);
  Quebec = new MapTerritoryConfiguration(Territory.Quebec);
  WesternUnitedStates = new MapTerritoryConfiguration(Territory.WesternUnitedStates);

  // South America    4
  Argentina = new MapTerritoryConfiguration(Territory.Argentina);
  Brazil = new MapTerritoryConfiguration(Territory.Brazil);
  Peru = new MapTerritoryConfiguration(Territory.Peru);
  Venezuela = new MapTerritoryConfiguration(Territory.Venezuela);

  // Europe           7
  GreatBritain = new MapTerritoryConfiguration(Territory.GreatBritain);
  Iceland = new MapTerritoryConfiguration(Territory.Iceland);
  NorthernEurope = new MapTerritoryConfiguration(Territory.NorthernEurope);
  Scandinavia = new MapTerritoryConfiguration(Territory.Scandinavia);
  SouthernEurope = new MapTerritoryConfiguration(Territory.SouthernEurope);
  Ukraine = new MapTerritoryConfiguration(Territory.Ukraine);
  WesternEurope = new MapTerritoryConfiguration(Territory.WesternEurope);

  // Africa           6
  Congo = new MapTerritoryConfiguration(Territory.Congo);
  EastAfrica = new MapTerritoryConfiguration(Territory.EastAfrica);
  Egypt = new MapTerritoryConfiguration(Territory.Egypt);
  Madagascar = new MapTerritoryConfiguration(Territory.Madagascar);
  NorthAfrica = new MapTerritoryConfiguration(Territory.NorthAfrica);
  SouthAfrica = new MapTerritoryConfiguration(Territory.SouthAfrica);

  // Asia             12
  Afghanistan = new MapTerritoryConfiguration(Territory.Afghanistan);
  China = new MapTerritoryConfiguration(Territory.China);
  India = new MapTerritoryConfiguration(Territory.India);
  Irkutsk = new MapTerritoryConfiguration(Territory.Irkutsk);
  Japan = new MapTerritoryConfiguration(Territory.Japan);
  Kamchatka = new MapTerritoryConfiguration(Territory.Kamchatka);
  MiddleEast = new MapTerritoryConfiguration(Territory.MiddleEast);
  Mongolia = new MapTerritoryConfiguration(Territory.Mongolia);
  Siam = new MapTerritoryConfiguration(Territory.Siam);
  Siberia = new MapTerritoryConfiguration(Territory.Siberia);
  Ural = new MapTerritoryConfiguration(Territory.Ural);
  Yakutsk = new MapTerritoryConfiguration(Territory.Yakutsk);

  // Australia        4
  EasternAustralia = new MapTerritoryConfiguration(Territory.EasternAustralia);
  Indonesia = new MapTerritoryConfiguration(Territory.Indonesia);
  NewGuinea = new MapTerritoryConfiguration(Territory.NewGuinea);
  WesternAustralia = new MapTerritoryConfiguration(Territory.WesternAustralia);

  get(territory: Territory): MapTerritoryConfiguration {
    const territoryName = Territory[territory];
    return this[territoryName] as MapTerritoryConfiguration;
  }
}
