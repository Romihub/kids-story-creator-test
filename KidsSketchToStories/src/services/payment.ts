// src/services/payment.ts
import { initStripe, createToken } from '@stripe/stripe-react-native';
import { API_URL, STRIPE_PUBLISHABLE_KEY } from '@env';
import { PaymentMethod, SubscriptionTier, Transaction } from '../types';

export class PaymentService {
  static async initialize() {
    await initStripe({
      publishableKey: STRIPE_PUBLISHABLE_KEY,
    });
  }

  static async createSubscription(tierID: string, paymentMethodId: string) {
    try {
      const response = await fetch(`${API_URL}/subscriptions/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tierID,
          paymentMethodId,
        }),
      });

      if (!response.ok) {
        throw new Error('Subscription creation failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Subscription creation failed');
    }
  }

  static async cancelSubscription(subscriptionId: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/subscriptions/${subscriptionId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to cancel subscription');
      }
    } catch (error) {
      throw new Error('Failed to cancel subscription');
    }
  }

  static async getPaymentMethods(): Promise<PaymentMethod[]> {
    try {
      const response = await fetch(`${API_URL}/payment-methods`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch payment methods');
      }

      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch payment methods');
    }
  }

  static async createPaymentMethod(
    cardNumber: string,
    expMonth: number,
    expYear: number,
    cvc: string
  ): Promise<PaymentMethod> {
    try {
      // Create a token using Stripe SDK
      const { token } = await createToken({
        type: 'Card',
        name: 'Test User',
        card: {
          number: cardNumber,
          expMonth,
          expYear,
          cvc,
        },
      });

      // Send token to your backend
      const response = await fetch(`${API_URL}/payment-methods`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment method');
      }

      return await response.json();
    } catch (error) {
      throw new Error('Failed to create payment method');
    }
  }

  static async getTransactionHistory(): Promise<Transaction[]> {
    try {
      const response = await fetch(`${API_URL}/transactions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transaction history');
      }

      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch transaction history');
    }
  }
}