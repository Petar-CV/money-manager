import { ICreditCard } from './credit-card.model';

export interface ICreditCardItem {
  id?: string;
  userId: string;
  name: string;
  description?: string;
  boughtAt: Date;
  firstInstalmentDate: Date;
  instalments: number;
  amount: number;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  card?: ICreditCard;
  cardId: string;
}

export class CreditCardItem implements ICreditCardItem {
  id?: string;
  userId: string;
  name: string;
  description?: string;
  boughtAt: Date;
  firstInstalmentDate: Date;
  instalments: number;
  amount: number;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  card?: ICreditCard;
  cardId: string;

  constructor(data: ICreditCardItem) {
    this.id = data.id;
    this.userId = data.userId;
    this.name = data.name;
    this.description = data.description;
    this.boughtAt = data.boughtAt;
    this.firstInstalmentDate = data.firstInstalmentDate;
    this.instalments = data.instalments;
    this.amount = data.amount;

    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.deletedAt = data.deletedAt;

    this.cardId = data.cardId;
    this.card = data.card;
  }
}
