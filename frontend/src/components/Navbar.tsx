import type { FC } from 'react';
import { Logo, Avatar, AngleDown } from '../assets';

const Navbar: FC<{ profileImage: string | undefined }> = ({ profileImage }) => {
	return (
		<div className="flex w-full justify-between">
			<img src={Logo} alt="Logo icon" className="w-[177px] h-[40px]" />
			<div className="flex gap-x-[10px]">
				<img
					src={profileImage ? profileImage : Avatar}
					alt="Profile Avatar"
					className="w-[40px] h-[40px] rounded-[832.5px]"
				/>
				<img src={AngleDown} alt="Angle down icon" />
			</div>
		</div>
	);
};

export default Navbar;
