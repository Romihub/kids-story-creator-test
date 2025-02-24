import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authService } from '../services/firebase/auth.service';
import {
  setUser,
  setLoading,
  setError,
  clearError,
  logout,
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = authService.onAuthStateChanged((user) => {
      dispatch(setUser(user));
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [dispatch]);

  const signIn = async (email: string, password: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const user = await authService.signIn(email, password);
      dispatch(setUser(user));
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const user = await authService.signUp(email, password);
      dispatch(setUser(user));
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
      dispatch(logout());
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };

  const resetPassword = async (email: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      await authService.resetPassword(email);
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };
};
