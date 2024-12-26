// src/hooks/useConnectedAccounts.ts
import { useState, useCallback } from 'react';

interface ConnectedAccount {
  id: string;
  provider: string;
  username: string;
  avatar?: string;
  lastSync?: string;
}

export const useConnectedAccounts = () => {
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([]);

  const linkAccount = useCallback(() => {
    // Implement account linking logic
    console.log('Linking new account...');
  }, []);

  const unlinkAccount = useCallback((id: string) => {
    setAccounts(prev => prev.filter(account => account.id !== id));
  }, []);

  return {
    accounts,
    linkAccount,
    unlinkAccount,
  };
}; 