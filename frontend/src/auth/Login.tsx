import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Logo } from '../assets';
import { type RootState, setLoginField } from '../reducer';
import { type LoginState } from '../interfaces/types';
import { FormInput, Loader } from '../components';
import { useAuthValidation, useAppData } from '../hooks/';

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loginUser, loaderState } = useAppData();
	const { authError, validateAuth } = useAuthValidation();

	const { email, password } = useSelector((state: RootState) => state.login);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(
			setLoginField({
				field: e.target.name as keyof LoginState,
				value: e.target.value,
			})
		);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateAuth(email, password)) return;

		try {
			await loginUser({ email, password });
			navigate('/');
		} catch (error) {
			console.log('err', error);
		}
	};
	return (
		<>
			{loaderState && <Loader />}
			{!loaderState && (
				<div className="flex flex-col justify-center items-center pt-20">
					<div className="pb-8 tablet:pb-12 flex items-center">
						<img src={Logo} alt="Logo icon" className="w-[177px] h-[40px]" />
					</div>
					<form
						onSubmit={handleSubmit}
						className="bg-neutral-0 mx-4 py-10 px-8 rounded-2xl shadow-custom flex flex-col gap-y-8 tablet:w-[530px] tablet:h-[503px] desktop:w-[530px] desktop:h-[530px]"
					>
						<div className="flex flex-col gap-y-2">
							<h1 className="text-preset-3-b text-neutral-900">
								Welcome back!
							</h1>
							<p className="text-preset-6-r text-neutral-600">
								Log in to continue tracking your mood and sleep.
							</p>
						</div>
						<div className="flex flex-col gap-y-5">
							<FormInput
								id="email"
								name="email"
								label="Email address"
								type="text"
								placeholder="name@gmail.com"
								value={email}
								onChange={handleChange}
								error={authError.emailErrorMsg}
							/>
							<FormInput
								id="password"
								name="password"
								label="Password"
								type="password"
								placeholder="password"
								value={password}
								onChange={handleChange}
								error={authError.passwordErrorMsg}
							/>
						</div>
						<div className="flex flex-col gap-y-5 justify-center items-center">
							<button className="bg-blue-600 px-8 py-3 w-full rounded-[10px] text-neutral-0 text-preset-5-b">
								Log in
							</button>
							<p className="text-preset-6-r text-neutral-600">
								Haven't got an account?{' '}
								<Link to={'/signup'} className="text-blue-600">
									Sign up.
								</Link>
							</p>
						</div>
					</form>
				</div>
			)}
		</>
	);
};

export default Login;
