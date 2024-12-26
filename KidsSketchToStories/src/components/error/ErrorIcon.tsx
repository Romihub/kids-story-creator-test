// src/components/error/ErrorIcon.tsx
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ErrorCodes } from '../../types/error';

interface ErrorIconProps {
  type: ErrorCodes;
}

export const ErrorIcon: React.FC<ErrorIconProps> = ({ type }) => {
  const getIconName = () => {
    switch (type) {
      case ErrorCodes.NETWORK:
        return 'wifi-off';
      case ErrorCodes.AUTH:
        return 'account-alert';
      case ErrorCodes.STORAGE:
        return 'database-alert';
      default:
        return 'alert-circle';
    }
  };

  return <Icon name={getIconName()} size={48} color="#FF6B6B" />;
}; 