import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RegisterState } from '../../interfaces/user';

interface FieldInterface {
	field: keyof RegisterState;
	value: RegisterState[keyof RegisterState];
}

const initialState: RegisterState = {
	email: '',
	password: '',
	name: '',
};

const registerSlice = createSlice({
	name: 'register',
	initialState,
	reducers: {
		setRegisterField: (state, action: PayloadAction<FieldInterface>) => {
			const { field, value } = action.payload;
			(state as any)[field] = value;
		},
		resetRegister: () => initialState,
	},
});

export const { setRegisterField, resetRegister } = registerSlice.actions;
export default registerSlice.reducer;
