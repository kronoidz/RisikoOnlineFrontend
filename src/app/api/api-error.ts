export enum ApiErrorType {
  InvalidCredentials,
  PlayerNameConflict,
  EntityNotFound,
  InvitationAlreadyAnswered,
  SelfInvitation,
  InvitationReceiverConflict,
  NotEnoughInvitations,
  MatchAlreadyInitialized,
  MatchNotInitialized,
  InvalidOwnerships,
}

export interface ApiError {
  isApiError: true;
  type: ApiErrorType;
  description: string;
  details?: string | null;
}
