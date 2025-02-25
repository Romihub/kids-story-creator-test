// src/services/PaymentService.ts
export class PaymentService {
  static async createSubscription(planId: string, paymentMethodId: string): Promise<void> {
    try {
      // Here you would typically make an API call to your backend
      // to create a subscription with Stripe
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          paymentMethodId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create subscription');
      }
    } catch (error) {
      console.error('Subscription creation failed:', error);
      throw error;
    }
  }
} 