import { useState } from 'react';
import { isValidEmail, isValidPassword } from '../utils/validation';

interface AuthErrorFace {
	emailErrorMsg: string;
	passwordErrorMsg: string;
};

const useAuthValidation = () => {
	const [authError, setAuthError] = useState<AuthErrorFace>({
		emailErrorMsg: '',
		passwordErrorMsg: '',
	});

	const validateAuth = (email: string, password: string): boolean => {
		const emailError = !email
			? 'Email is required'
			: !isValidEmail(email)
			? 'Invalid email address'
			: '';

		const passwordError = !password
			? 'Password is required'
			: !isValidPassword(password)
			? 'Password must be at least 6 characters'
			: '';

		setAuthError({
			emailErrorMsg: emailError,
			passwordErrorMsg: passwordError,
		});

		return !emailError && !passwordError;
	};

	return {
		authError,
		validateAuth,
	};
};

export default useAuthValidation;
