import type { ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Logo } from '../assets';
import { type RootState, setRegisterField } from '../reducer';
import { type RegisterState } from '../interfaces/types';
import { FormInput } from '../components';
import { useAuthValidation } from '../hooks';

const Signup = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { authError, validateAuth } = useAuthValidation();

	const { email, password } = useSelector((state: RootState) => state.register);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(
			setRegisterField({
				field: e.target.name as keyof RegisterState,
				value: e.target.value,
			})
		);
	};

	const handleNext = (e: FormEvent) => {
		e.preventDefault();

		if (!validateAuth(email, password)) return;
		navigate('/onboarding');
	};

	return (
		<div className="flex flex-col justify-center items-center pt-20">
			<div className="pb-8 tablet:pb-12 flex items-center">
				<img src={Logo} alt="Logo icon" className="w-[177px] h-[40px]" />
			</div>
			<form
				onSubmit={handleNext}
				className="bg-neutral-0 mx-4 py-10 px-8 rounded-2xl shadow-custom flex flex-col tablet:w-[530px] tablet:h-[503px] desktop:w-[530px] desktop:h-[530px]"
			>
				<div className="flex flex-col gap-y-2 mb-8">
					<h1 className="text-preset-3-b text-neutral-900">
						Create an account
					</h1>
					<p className="text-preset-6-r text-neutral-600">
						Join to track your daily mood and sleep with ease.
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
				<div className="flex flex-col gap-y-5 justify-center items-center mt-8">
					<button className="bg-blue-600 px-8 py-3 w-full rounded-[10px] text-neutral-0 text-preset-5-b">
						Sign Up
					</button>
					<p className="text-preset-6-r text-neutral-600">
						Already got an account?{' '}
						<Link to={'/login'} className="text-blue-600">
							Log in.
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default Signup;
