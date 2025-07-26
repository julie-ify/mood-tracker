import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { LoginState } from '../../interfaces/types';

interface FieldInterface {
	field: keyof LoginState;
	value: LoginState[keyof LoginState];
}

const initialState: LoginState = {
	email: '',
	password: '',
};

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setLoginField: (state, action: PayloadAction<FieldInterface>) => {
			const { field, value } = action.payload;
			(state as any)[field] = value;
		},
	},
});

export const { setLoginField } = loginSlice.actions;
export default loginSlice.reducer;
