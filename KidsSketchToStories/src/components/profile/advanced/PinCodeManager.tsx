import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface PinCodeManagerProps {
  onPinSet: (pin: string) => void;
  onPinReset: () => void;
}

export const PinCodeManager: React.FC<PinCodeManagerProps> = ({
  onPinSet,
  onPinReset,
}) => {
  const [pin, setPin] = useState<string>('');
  const [confirmPin, setConfirmPin] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handlePinSubmit = () => {
    if (pin.length < 4) {
      setError('PIN must be at least 4 digits');
      return;
    }

    if (pin !== confirmPin) {
      setError('PINs do not match');
      return;
    }

    setError('');
    onPinSet(pin);
  };

  const handleReset = () => {
    setPin('');
    setConfirmPin('');
    setError('');
    onPinReset();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PIN Code</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={pin}
          onChangeText={setPin}
          placeholder="Enter PIN"
          keyboardType="numeric"
          secureTextEntry
          maxLength={6}
        />
        <TextInput
          style={styles.input}
          value={confirmPin}
          onChangeText={setConfirmPin}
          placeholder="Confirm PIN"
          keyboardType="numeric"
          secureTextEntry
          maxLength={6}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePinSubmit}
        >
          <Text style={styles.buttonText}>Set PIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={handleReset}
        >
          <Text style={[styles.buttonText, styles.resetButtonText]}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  inputContainer: {
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#F0F0F0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  error: {
    color: '#FF3B30',
    fontSize: 12,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '500',
  },
  resetButton: {
    backgroundColor: '#F0F0F0',
  },
  resetButtonText: {
    color: '#FF3B30',
  },
}); 