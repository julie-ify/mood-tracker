import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../lib/axios';
import { type RootState, setUser } from '../reducer';
import type { LoginState } from '../interfaces/types';

const useAppData = () => {
	const { email, token } = useSelector((state: RootState) => state.user);
	const [loaderState, setLoaderState] = useState(false);
	const dispatch = useDispatch();

	const createUser = async (formData: FormData): Promise<void> => {
		try {
			setLoaderState(true);
			const response = await api.post('/signup', formData);
			const { data } = response;
			dispatch(
				setUser({
					email: data.user.email,
					token: data.token,
				})
			);
			setLoaderState(false);
		} catch (error) {
			setLoaderState(false);
			throw new Error('Sign up error');
		}
	};

	const loginUser = async (user: LoginState): Promise<void> => {
		try {
			setLoaderState(true);
			const response = await api.post('/login', user);
			const { data } = response;
			dispatch(
				setUser({
					email: data.user.email,
					token: data.token,
				})
			);
			setLoaderState(false);
		} catch (error) {
			setLoaderState(false);
			throw new Error('Login in error');
		}
	};

	return {
		email,
		token,
		createUser,
		loginUser,
		loaderState,
	};
};

export default useAppData;
