export class UserCredential {
  constructor(public email: string, public token: string, public expirationTime: Date) {}
}
