import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from '../../interfaces/types';

const initialState: AuthState = {
	user: null,
	token: null
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<AuthState>) {
			state.user = action.payload.user;
			state.token = action.payload.token
		},
		logout(state) {
			state.user = null
			state.token = null
		},
	},
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
