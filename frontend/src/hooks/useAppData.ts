import { useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../lib/axios';
import { setUser, update } from '../reducer';
import type { LoginState } from '../interfaces/types';
import { handleApiError } from '../utils/errors';

const useAppData = () => {
	const [loaderState, setLoaderState] = useState(false);
	const dispatch = useDispatch();

	const createUser = async (formData: FormData): Promise<void> => {
		setLoaderState(true);

		try {
			const { data } = await api.post('/signup', formData);

			console.log('API response data:', data);

			dispatch(
				setUser({
					user: {
						name: data.user.name,
						checkins: data.user.checkins,
						avatar_url: data.user.avatar_url,
						email: data.user.email,
					},
					token: data.token,
				}),
			);
			localStorage.setItem('token', data.token);
		} catch (error) {
			handleApiError(error);
		} finally {
			setLoaderState(false);
		}
	};

	const updateUser = async (formData: FormData): Promise<void> => {
		setLoaderState(true);

		try {
			const token = localStorage.getItem('token');

			const { data } = await api.patch('/profile', formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			dispatch(
				update({
					name: data.user.name,
					avatar_url: data.user.avatar_url,
				}),
			);
		} catch (error) {
			handleApiError(error);
		} finally {
			setLoaderState(false);
		}
	};

	const loginUser = async (user: LoginState): Promise<void> => {
		setLoaderState(true);

		try {
			const { data } = await api.post('/login', user);

			dispatch(
				setUser({
					user: {
						name: data.user.name,
						checkins: data.user.checkins,
						avatar_url: data.user.avatar_url,
						email: data.user.email,
					},
					token: data.token,
				}),
			);
			localStorage.setItem('token', data.token);
		} catch (error) {
			handleApiError(error);
		} finally {
			setLoaderState(false);
		}
	};

	const fetchUser = async (token: string): Promise<void> => {
		setLoaderState(true);

		try {
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
						email: data.user.email,
					},
					token: token,
				}),
			);
		} catch (error) {
			handleApiError(error);
		} finally {
			setLoaderState(false);
		}
	};

	return {
		createUser,
		loginUser,
		loaderState,
		fetchUser,
		updateUser,
	};
};

export default useAppData;
