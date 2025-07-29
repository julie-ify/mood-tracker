export interface RegisterState {
	email: string;
	password: string;
	name?: string;
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
	feelings: any;
	mood: string;
	sleep: string;
	reflection: string;
	createdAt: Date;
}

export interface AuthState {
	user: User | null;
	token: string | null
}
