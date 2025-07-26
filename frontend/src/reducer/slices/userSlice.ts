import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserState {
	email: string;
	token: string;
}

const initialState: UserState = {
	email: '',
	token: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<UserState>) {
			state.email = action.payload.email;
			state.token = action.payload.token;
		},
		logout(state) {
			state.email = '';
			state.token = '';
		},
	},
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
