export interface ICreditCardIssuer {
  id?: string;
  name: string;
  logo: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export class CreditCardIssuer implements ICreditCardIssuer {
  id?: string;
  name: string;
  logo: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor(data: ICreditCardIssuer) {
    this.id = data.id;
    this.name = data.name;
    this.logo = data.logo;

    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.deletedAt = data.deletedAt;
  }
}
