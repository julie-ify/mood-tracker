export interface RegisterState {
	email: string;
	password: string;
	name: string;
}

export interface LoginState {
	email: string;
	password: string;
}

interface User {
	name: string;
	checkins: Checkin[];
	avatar_url?: string;
}

export interface Checkin {
	feelings: string[];
	mood: string;
	sleep: string;
	reflection: string;
	created_at: Date;
}

export interface AuthState {
	user: User | null;
	token: string | null
}

export interface AverageCheckin {
	date: string;
	sleep: string;
	mood: string;
}
