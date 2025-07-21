import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';

const Signup = () => {
	return (
		<div className="flex flex-col justify-center items-center pt-20">
			<div className="pb-8 tablet:pb-12 flex items-center">
				<img src={Logo} alt="Logo icon" className="w-[177px] h-[40px]" />
			</div>
			<form className="bg-neutral-0 mx-4 py-10 px-8 rounded-2xl shadow-custom flex flex-col gap-y-8 tablet:w-[530px] tablet:h-[503px] desktop:w-[530px] desktop:h-[530px]">
				<div className="flex flex-col gap-y-2">
					<h1 className="text-preset-3-b text-neutral-900">Create an account</h1>
					<p className="text-preset-6-r text-neutral-600">
						Join to track your daily mood and sleep with ease.
					</p>
				</div>
				<div className="flex flex-col gap-y-5">
					<div className="flex flex-col gap-y-2">
						<label htmlFor="email" className="text-preset-6-r text-neutral-900">
							Email address
						</label>
						<input
							type="text"
							id="email"
							placeholder="name@gmail.com"
							className="text-neutral-0 px-4 py-3 placeholder-neutral-600 rounded-[10px] text-preset-6-r border border-neutral-300"
						/>
					</div>
					<div className="flex flex-col gap-y-2">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							placeholder="password"
							className="text-neutral-0 px-4 py-3 placeholder-neutral-600 rounded-[10px] text-preset-6-r border border-neutral-300"
						/>
					</div>
				</div>
				<div className="flex flex-col gap-y-5 justify-center items-center">
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
