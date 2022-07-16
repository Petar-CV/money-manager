export enum AdminRoutes {
  ADMIN = '/admin', // base path for admin routes (dashboard)
  ADMIN_CARDS = '/admin/cards', // base path for admin cards routes
  ADMIN_CREDIT_CARDS_BASE = '/admin/cards/credit', // base path for admin credit cards routes
}

export enum AdminCreditCardIssuersRoutes {
  ADMIN_CREDIT_CARD_ISSUERS = '/admin/cards/credit/issuers',
  ADMIN_CREDIT_CARD_ISSUERS_CREATE = '/admin/cards/credit/issuers/create',
}

export enum AdminCreditCardsRoutes {
  ADMIN_CREDIT_CARDS = '/admin/cards/credit/cards',
  ADMIN_CREDIT_CARDS_CREATE = '/admin/cards/credit/cards/create',
}

export enum AdminCreditCardItemsRoutes {
  ADMIN_CREDIT_CARD_ITEMS = '/admin/cards/credit/items',
  ADMIN_CREDIT_CARD_ITEMS_CREATE = '/admin/cards/credit/items/create',
}
