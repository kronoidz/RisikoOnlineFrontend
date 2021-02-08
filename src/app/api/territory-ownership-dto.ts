import { Territory } from './territory';

export interface TerritoryOwnershipDto {
  player: string;
  match: number;
  territory: Territory;
  armies: number;
}
