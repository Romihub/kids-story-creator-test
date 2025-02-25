// src/components/subscription/PaymentSheet.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { Button } from '../common/Button';
import { PaymentService } from '../../services/PaymentService';

interface PaymentSheetProps {
  onPaymentComplete: (success: boolean) => void;
  amount: number;
}

type ButtonProps = React.ComponentProps<typeof Button>;

export const PaymentSheet: React.FC<PaymentSheetProps> = ({
  onPaymentComplete,
  amount,
}) => {
  const [loading, setLoading] = useState(false);
  const { createPaymentMethod } = useStripe();

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { paymentMethod, error } = await createPaymentMethod({
        paymentMethodType: 'Card' as const,
      });

      if (error) {
        throw error;
      }

      if (paymentMethod) {
        await PaymentService.createSubscription(
          'premium',
          paymentMethod.id
        );
        onPaymentComplete(true);
      }
    } catch (error) {
      onPaymentComplete(false);
    } finally {
      setLoading(false);
    }
  };

  const buttonProps: ButtonProps = {
    title: `Pay $${amount.toFixed(2)}`,
    onPress: handlePayment,
    disabled: loading,
  };

  return (
    <View style={styles.container}>
      <CardField
        postalCodeEnabled={false}
        style={styles.cardField}
      />
      <Button {...buttonProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  cardField: {
    height: 50,
    marginVertical: 16,
  },
});