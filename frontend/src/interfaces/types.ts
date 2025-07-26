export interface RegisterState {
	email: string;
	password: string;
	name?: string;
}

export interface LoginState {
	email: string;
	password: string;
}

export interface UserState {
	email: string;
	token: string;
}
