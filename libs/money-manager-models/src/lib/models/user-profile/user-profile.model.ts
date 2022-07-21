export interface IUserProfile {
  userId?: string;
  language: string;
  currency: string;
}

export class UserProfile implements IUserProfile {
  userId?: string;
  language: string;
  currency: string;

  constructor(data: IUserProfile) {
    this.userId = data.userId;
    this.language = data.language;
    this.currency = data.currency;
  }
}
