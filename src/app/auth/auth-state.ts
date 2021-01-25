export class AuthState {
  constructor(public name = null, public token = null)
  {}

  isValid(): boolean {
    return this.name && this.token;
  }
}
