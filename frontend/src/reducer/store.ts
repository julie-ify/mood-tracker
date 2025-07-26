import { configureStore } from '@reduxjs/toolkit';
import { userReducer, registerReducer, loginReducer } from './';

const store = configureStore({
	reducer: {
		user: userReducer,
		register: registerReducer,
		login: loginReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
