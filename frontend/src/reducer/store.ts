import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import registerReducer from './slices/registerSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		register: registerReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
