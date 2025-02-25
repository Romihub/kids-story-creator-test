//src/store/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserSettings {
  theme: string;
  language: string;
  notifications: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

interface UserState {
  isAuthenticated: boolean;
  user: any | null;
  settings: UserSettings;
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
  settings: {
    theme: 'light',
    language: 'en',
    notifications: true,
    soundEnabled: true,
    vibrationEnabled: true,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    updateSettings: (state, action: PayloadAction<Partial<UserState['settings']>>) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, updateSettings, logout } = userSlice.actions;
export default userSlice.reducer;