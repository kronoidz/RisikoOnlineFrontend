export interface InvitationDto {
  id: number;
  sender: string;
  receiver: string;
  accepted: boolean | null;
}
