import {MissionObjective} from './mission-objective';

export interface PlayerStateDto {
  match: number;
  player: string;

  isInitialized: boolean;

  missionObjective: MissionObjective;
  targetPlayer: string | null;

  reinforcementPoints: number;
  unplacedArmies: number;
}
