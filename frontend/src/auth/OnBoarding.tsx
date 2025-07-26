import React, { useState } from 'react';
import Logo from '../assets/logo.svg';
import Avatar from '../assets/Avatar.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setRegisterField } from '../reducer/slices/registerSlice';
import type { RootState } from '../reducer/store';
import type { RegisterState } from '../interfaces/user';
import useUserData from '../hooks/useUserData';
import { useNavigate } from 'react-router-dom';

const OnBoarding = () => {
	const [avatarFile, setAvatarFile] = useState<File | null>(null);
	const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
	const { createUser } = useUserData();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { name, email, password } = useSelector(
		(state: RootState) => state.register
	);

	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setAvatarFile(file);
			setAvatarPreview(URL.createObjectURL(file));
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(
			setRegisterField({
				field: e.target.name as keyof RegisterState,
				value: e.target.value,
			})
		);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('email', email);
		formData.append('password', password);
		formData.append('name', name ?? '');
		if (avatarFile instanceof File) {
			formData.append('avatar', avatarFile);
		}

		try {
			await createUser(formData);
			navigate('/');
		} catch (error) {}
	};

	return (
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
						Personalize your experience
					</h1>
					<p className="text-preset-6-r text-neutral-600">
						Add your name and a profile picture to make Mood yours.
					</p>
				</div>
				<div className="flex flex-col gap-y-5">
					<div className="flex flex-col gap-y-2">
						<label htmlFor="name" className="text-preset-6-r text-neutral-900">
							Name
						</label>
						<input
							onChange={handleChange}
							name="name"
							type="text"
							id="name"
							placeholder="Jane Appleseed"
							className="text-neutral-900 px-4 py-3 placeholder-neutral-600 rounded-[10px] text-preset-6-r border border-neutral-300 focus:outline-blue-600 hover:border-neutral-600"
						/>
					</div>

					<div className="flex gap-x-5">
						<img
							src={avatarPreview || Avatar}
							alt="Avatar preview"
							className="w-16 h-16 rounded-full object-cover"
						/>
						<div className="flex flex-col">
							<label
								htmlFor="avatar"
								className="cursor-pointer flex flex-col gap-y-4"
							>
								<div className="flex flex-col gap-1">
									<p className="text-preset-6-r text-neutral-900">
										Upload Image
									</p>
									<p className="text-preset-7-r text-neutral-600">
										Max 250KB, PNG or JPEG
									</p>
								</div>
								<div className="w-fit bg-neutral-0 text-neutral-900 rounded-lg px-4 py-2 text-preset-6-m border border-neutral-300">
									Upload
								</div>
							</label>

							<input
								name="avatar"
								type="file"
								id="avatar"
								accept="image/png, image/jpeg"
								onChange={handleAvatarChange}
								className="hidden"
							/>
						</div>
					</div>
				</div>
				<button className="bg-blue-600 px-8 py-3 w-full rounded-[10px] text-neutral-0 text-preset-5-b">
					Start Tracking
				</button>
			</form>
		</div>
	);
};

export default OnBoarding;
