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

export interface MockGame {
  id: string;
  name: string;
  publisher: string;
  purchaseCount: number;
  totalSpentMinor: number;
  currency: 'EUR';
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

export const mockGames: MockGame[] = [
  {
    id: 'game-1',
    name: 'Fortnite',
    publisher: 'Epic Games',
    purchaseCount: 1,
    totalSpentMinor: 899,
    currency: 'EUR',
  },
  {
    id: 'game-2',
    name: 'Overwatch 2',
    publisher: 'Blizzard Entertainment',
    purchaseCount: 1,
    totalSpentMinor: 999,
    currency: 'EUR',
  },
  {
    id: 'game-3',
    name: 'Genshin Impact',
    publisher: 'HoYoverse',
    purchaseCount: 1,
    totalSpentMinor: 599,
    currency: 'EUR',
  },
  {
    id: 'game-4',
    name: 'Minecraft',
    publisher: 'Mojang Studios',
    purchaseCount: 1,
    totalSpentMinor: 399,
    currency: 'EUR',
  },
];
