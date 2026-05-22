import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../reducer/store.ts';
import { useEffect, useState } from 'react';
import {
	AverageMood,
	AverageSleep,
	Navbar,
	TrendsChart,
	Menu,
} from '../components';
import { motion } from 'framer-motion';
import { logout } from '../reducer/index.ts';
import { useNavigate } from 'react-router-dom';

interface DashboardFace {
	modalHandler: () => void;
	isMenuOpen: boolean;
	toggleMenu: () => void;
}

const Dashboard = ({ modalHandler, isMenuOpen, toggleMenu }: DashboardFace) => {
	const { user } = useSelector((state: RootState) => state.user);
	const [name, setName] = useState<string>('There');
	const [email, setEmail] = useState<string>('');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
		}
	}, [user]);

	const logoutHandler = (): void => {
		dispatch(logout());
		toggleMenu();
		navigate('/login');
	};

	return (
		<>
			<div
				className="w-screen flex flex-col gap-y-12 desktop:gap-y-16 justify-center items-center 
			pt-8 pb-20 px-4 tablet:pt-10 tablet:px-8 tablet:max-w-[768px] 
			desktop:max-w-[1170px] desktop:pt-12 mx-auto"
			>
				<div className="flex flex-col w-full justify-between gap-y-12 desktop:gap-y-16 relative">
					<Navbar profileImage={user?.avatar_url} toggleMenu={toggleMenu} />
					{isMenuOpen && (
						<div className="w-full flex absolute top-10 right-0">
							<motion.div
								initial={{ x: -100, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ duration: 0.6 }}
								className="w-full"
							>
								<Menu
									name={name}
									email={email}
									logoutHandler={logoutHandler}
									modalHandler={modalHandler}
								/>
							</motion.div>
						</div>
					)}
					<div className="flex flex-col gap-y-4 text-center tablet:gap-y-[10px]">
						<h1 className="text-preset-4-b text-blue-600 tablet:text-preset-3-b">
							Hello, {name}!
						</h1>
						<h1 className="text-preset-1-b-mb text-neutral-900 tablet:text-preset-1-b">
							How are you feeling today?
						</h1>
						<p className="text-preset-6-m text-neutral-600">
							{new Date().toLocaleDateString('en-US', {
								weekday: 'long',
								month: 'long',
								day: 'numeric',
								year: 'numeric',
							})}
						</p>
					</div>
					<div className="w-full flex items-center justify-center">
						<button
							className="bg-blue-600 w-[226px] py-4 px-7 rounded-[10px]
					 text-neutral-0 text-preset-5-b cursor-pointer"
						>
							Log today's mood
						</button>
					</div>
				</div>
				<div className="flex flex-col gap-y-8 w-full desktop:flex-row desktop:gap-x-6 desktop:gap-y-0">
					<div className="bg-neutral-0 flex flex-col gap-y-6 rounded-[20px] w-full desktop:max-w-[400px] px-4 py-5 tablet:py-6">
						<AverageMood />
						<AverageSleep />
					</div>
					<TrendsChart />
				</div>
			</div>
		</>
	);
};

export default Dashboard;
