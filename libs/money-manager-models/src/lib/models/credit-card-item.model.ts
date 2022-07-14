export interface ICreditCardItem {
  id?: string;
  userId?: string;
  name: string;
  description?: string;
  boughtAt: Date;
  instalments: number;
  amount: number;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  cardId: string;
}

export class CreditCardItem implements ICreditCardItem {
  id?: string;
  userId?: string;
  name: string;
  description?: string;
  boughtAt: Date;
  instalments: number;
  amount: number;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  cardId: string;

  constructor(data: ICreditCardItem) {
    this.id = data.id;
    this.userId = data.userId;
    this.name = data.name;
    this.description = data.description;
    this.boughtAt = data.boughtAt;
    this.instalments = data.instalments;
    this.amount = data.amount;

    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.deletedAt = data.deletedAt;

    this.cardId = data.cardId;
  }
}
