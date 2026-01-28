export class TokenStore {
  private static accessToken: string | null = null;

  static setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  static getAccessToken(): string | null {
    return this.accessToken;
  }
}
