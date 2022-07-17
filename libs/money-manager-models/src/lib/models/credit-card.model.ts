import { ICreditCardIssuer } from './credit-card-issuer.model';

export interface ICreditCard {
  id?: string;
  userId: string;
  name: string;
  limit: number;
  billingDate: number;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  issuer?: Partial<ICreditCardIssuer>;
  issuerId: string;
}

export class CreditCard implements ICreditCard {
  id?: string;
  userId: string;
  name: string;
  limit: number;
  billingDate: number;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  issuerId: string;
  issuer?: Partial<ICreditCardIssuer>;

  constructor(data: ICreditCard) {
    this.id = data.id;
    this.userId = data.userId;
    this.name = data.name;
    this.limit = data.limit;
    this.billingDate = data.billingDate;

    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.deletedAt = data.deletedAt;

    this.issuerId = data.issuerId;
    this.issuer = data.issuer;
  }
}
