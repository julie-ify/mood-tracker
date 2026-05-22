import axios from 'axios';

export const handleApiError = (error: unknown): never => {
	if (axios.isAxiosError(error)) {
		const status = error.response?.status;
		const message =
			error.response?.data?.error?.message || error.response?.data?.errors?.[0];

		switch (status) {
			case 401:
				throw new Error(message || 'Please log in');

			case 422:
				throw new Error(message || 'Validation failed');

			case 500:
				throw new Error('Server error, try again later');

			default:
				throw new Error(message || 'Request failed');
		}
	}

	throw new Error('Unexpected error occurred');
};
