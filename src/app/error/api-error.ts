export enum ApiErrorType {
  InvalidCredentials,
  PlayerNameConflict,
  EntityNotFound,
  InvitationAlreadyAnswered,
  SelfInvitation,
  InvitationReceiverConflict,
  NotEnoughInvitations,
}

export interface ApiError {
  type: ApiErrorType;
  description: string;
  details?: string | null;
}
