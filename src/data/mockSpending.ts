export type PurchaseCategory =
  | 'virtualCurrency'
  | 'battlePass'
  | 'subscription'
  | 'cosmetic';

export interface MockPurchase {
  id: string;
  gameName: string;
  productName: string;
  category: PurchaseCategory;
  amountMinor: number;
  currency: 'EUR';
  daysAgo: number;
}

export const mockPurchases: MockPurchase[] = [
  {
    id: 'purchase-1',
    gameName: 'Fortnite',
    productName: '1,000 V-Bucks',
    category: 'virtualCurrency',
    amountMinor: 899,
    currency: 'EUR',
    daysAgo: 2,
  },
  {
    id: 'purchase-2',
    gameName: 'Overwatch 2',
    productName: 'Premium Battle Pass',
    category: 'battlePass',
    amountMinor: 999,
    currency: 'EUR',
    daysAgo: 7,
  },
  {
    id: 'purchase-3',
    gameName: 'Genshin Impact',
    productName: 'Blessing of the Welkin Moon',
    category: 'subscription',
    amountMinor: 599,
    currency: 'EUR',
    daysAgo: 14,
  },
  {
    id: 'purchase-4',
    gameName: 'Minecraft',
    productName: 'Skin Pack',
    category: 'cosmetic',
    amountMinor: 399,
    currency: 'EUR',
    daysAgo: 23,
  },
];
