//src/types/index.ts
// Subscription related types
export enum SubscriptionTier {
    FREE = 'FREE',
    PREMIUM = 'PREMIUM',
    PRO = 'PRO'
}
  
export enum SubscriptionStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    PENDING = 'PENDING',
    CANCELLED = 'CANCELLED'
}
  
export interface Subscription {
    tier: SubscriptionTier;
    status: SubscriptionStatus;
    startDate: string;
    endDate: string;
    features: string[];
    price: number;
}
  
  // Payment related types
export interface PaymentMethod {
    id: string;
    type: 'card' | 'paypal';
    last4?: string;
    expiryMonth?: number;
    expiryYear?: number;
}
  
export interface Transaction {
    id: string;
    amount: number;
    currency: string;
    status: 'success' | 'failed' | 'pending';
    date: string;
    paymentMethod: PaymentMethod;
}
  
  // Drawing related types
export interface Drawing {
    id: string;
    userId: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    title: string;
}
  
  // Story related types
export interface Story {
    id: string;
    userId: string;
    title: string;
    content: string[];
    drawings: Drawing[];
    createdAt: string;
    updatedAt: string;
    isPublished: boolean;
}
  
  // User related types
export interface User {
    id: string;
    email: string;
    name: string;
    subscription: Subscription;
    createdAt: string;
    updatedAt: string;
}
  
  // App state related types
export interface AppState {
    isLoading: boolean;
    error: string | null;
}

export * from './navigation';