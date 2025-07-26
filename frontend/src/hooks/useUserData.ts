import api from '../lib/axios';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../reducer/store';
import { setUser } from '../reducer/slices/userSlice';

const useUserData = () => {
	const { email, token } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();

	const createUser = async (formData: FormData): Promise<void> => {
		try {
			const response = await api.post('/signup', formData);
			const { data } = response;
			dispatch(
				setUser({
					email: data.user.email,
					token: data.token,
				})
			);
		} catch (error) {
			throw new Error('Sign up error');
		}
	};

	return {
		email,
		token,
		createUser,
	};
};

export default useUserData;
