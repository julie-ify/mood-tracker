import { useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../lib/axios';
import { setUser, logout } from '../reducer';
import type { LoginState } from '../interfaces/types';

const useAppData = () => {
	const [loaderState, setLoaderState] = useState(false);
	const dispatch = useDispatch();

	const createUser = async (formData: FormData): Promise<void> => {
		try {
			setLoaderState(true);
			const { data } = await api.post('/signup', formData);

			dispatch(
				setUser({
					user: {
						name: data.name,
						checkins: data.checkins,
						avatar_url: data.avatar_url,
					},
					token: data.token,
				})
			);
			localStorage.setItem('token', data.token);
		} catch (error) {
			throw new Error('Sign up error');
		} finally {
			setLoaderState(false);
		}
	};

	const loginUser = async (user: LoginState): Promise<void> => {
		try {
			setLoaderState(true);
			const { data } = await api.post('/login', user);

			dispatch(
				setUser({
					user: {
						name: data.user.name,
						checkins: data.user.checkins,
						avatar_url: data.user.avatar_url,
					},
					token: data.token,
				})
			);
			localStorage.setItem('token', data.token);
		} catch (error) {
			throw new Error('Login error');
		} finally {
			setLoaderState(false);
		}
	};

	const fetchUser = async (token: string): Promise<void> => {
		try {
			setLoaderState(true);
			const { data } = await api.get('/checkins', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			dispatch(
				setUser({
					user: {
						name: data.user.name,
						checkins: data.user.checkins,
						avatar_url: data.user.avatar_url,
					},
					token: token,
				})
			);
		} catch (error) {
			dispatch(logout());
			localStorage.removeItem('token');
			throw new Error('Fetching check-ins failed');
		} finally {
			setLoaderState(false);
		}
	};

	return {
		createUser,
		loginUser,
		loaderState,
		fetchUser,
	};
};

export default useAppData;
