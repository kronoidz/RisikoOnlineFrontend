export interface Invitation {
  id: number;
  sender: string;
  receiver: string;
  accepted: boolean | null;
}
