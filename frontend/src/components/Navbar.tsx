import { Logo, Avatar } from '../assets';
import { ChevronDown } from 'lucide-react';

interface NavbarFace {
	profileImage: string | undefined;
	toggleMenu: () => void;
}

const Navbar = ({ profileImage, toggleMenu }: NavbarFace) => {
	return (
		<div className="flex w-full justify-between">
			<img src={Logo} alt="Logo icon" className="w-[177px] h-[40px]" />
			<div
				className="flex items-center gap-[2px] cursor-pointer h-[40px] w-[65px]"
				onClick={toggleMenu}
			>
				<img
					src={profileImage ? profileImage : Avatar}
					alt="Profile Avatar"
					className="w-[40px] h-[40px] rounded-[612.5px]"
				/>
				<div>
					<ChevronDown className="text-neutral-900" />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
