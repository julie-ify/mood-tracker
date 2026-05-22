import { LogOut, Settings } from 'lucide-react';

interface MenuFace {
	name: string;
	email: string;
	logoutHandler: () => void;
	modalHandler: () => void;
}

const Menu = ({ name, email, logoutHandler, modalHandler }: MenuFace) => {
	return (
		<div className="bg-neutral-0 w-full md:w-[200px] h-[148px] px-4 py-3 mt-3 rounded-lg flex flex-col gap-y-2 translate-x-0">
			<div className="flex flex-col gap-y-1">
				<h3 className="text-preset-6-b text-neutral-900">{name}</h3>
				<h5 className="text-preset-7-r text-neutral-300">{email}</h5>
			</div>
			<hr className="my-1" />
			<button
				className="flex items-center gap-x-2 text-neutral-900 hover:text-blue-600 text-preset-7-r mb-1"
				onClick={modalHandler}
			>
				<Settings size={16} />
				<span>Settings</span>
			</button>
			<button
				className="flex items-center gap-x-2 text-neutral-900 hover:text-blue-600 text-preset-7-r"
				onClick={logoutHandler}
			>
				<LogOut size={16} />
				<span>Logout</span>
			</button>
		</div>
	);
};

export default Menu;
