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

export interface MockGameCatalogItem {
  id: string;
  name: string;
  publisher: string;
  genres: string[];
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

export const mockGameCatalog: MockGameCatalogItem[] = [
  {
    id: 'game-1',
    name: 'Fortnite',
    publisher: 'Epic Games',
    genres: ['Battle royale', 'Shooter'],
  },
  {
    id: 'game-2',
    name: 'Overwatch 2',
    publisher: 'Blizzard Entertainment',
    genres: ['Hero shooter', 'Shooter'],
  },
  {
    id: 'game-3',
    name: 'Genshin Impact',
    publisher: 'HoYoverse',
    genres: ['Action RPG', 'Open world', 'Gacha game'],
  },
  {
    id: 'game-4',
    name: 'Minecraft',
    publisher: 'Mojang Studios',
    genres: ['Sandbox', 'Survival'],
  },
  {
    id: 'game-5',
    name: 'Valorant',
    publisher: 'Riot Games',
    genres: ['Tactical shooter', 'Shooter'],
  },
  {
    id: 'game-6',
    name: 'League of Legends',
    publisher: 'Riot Games',
    genres: ['MOBA', 'Strategy'],
  },
  {
    id: 'game-7',
    name: 'Apex Legends',
    publisher: 'Electronic Arts',
    genres: ['Battle royale', 'Shooter'],
  },
  {
    id: 'game-8',
    name: 'Honkai: Star Rail',
    publisher: 'HoYoverse',
    genres: ['Turn-based RPG', 'Strategy', 'Gacha game'],
  },
];
