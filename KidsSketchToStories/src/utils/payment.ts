//src/utils/payment.ts
import { PaymentMethod, Transaction } from '../types';

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatCardNumber = (last4: string): string => {
  return `•••• ${last4}`;
};

export const formatExpiryDate = (month: number, year: number): string => {
  return `${month.toString().padStart(2, '0')}/${year.toString().slice(-2)}`;
};

export const validateCard = (
  cardNumber: string,
  expMonth: number,
  expYear: number,
  cvc: string
): boolean => {
  // Basic validation
  const isValidNumber = /^\d{16}$/.test(cardNumber.replace(/\s/g, ''));
  const isValidMonth = expMonth >= 1 && expMonth <= 12;
  const isValidYear = expYear >= new Date().getFullYear();
  const isValidCVC = /^\d{3,4}$/.test(cvc);

  return isValidNumber && isValidMonth && isValidYear && isValidCVC;
};

export const getPaymentMethodIcon = (type: PaymentMethod['type']): string => {
  switch (type) {
    case 'card':
      return 'credit-card';
    case 'paypal':
      return 'paypal';
    default:
      return 'money';
  }
};

export const getTransactionStatusColor = (status: Transaction['status']): string => {
  switch (status) {
    case 'success':
      return '#4CAF50';
    case 'pending':
      return '#FFC107';
    case 'failed':
      return '#F44336';
    default:
      return '#9E9E9E';
  }
};