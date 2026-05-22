import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../reducer';
import { Avatar } from '../assets';
import { X } from 'lucide-react';
import { useAppData } from '../hooks';
import { Loader, ErrorMessage } from '../components';
import { isValidName } from '../utils/validation';

interface ProfileProps {
	closeProfileModal: () => void;
	isProfileModalOpen: boolean;
}

const Profile = ({ closeProfileModal, isProfileModalOpen }: ProfileProps) => {
	const { user } = useSelector((state: RootState) => state.user);
	const [name, setName] = useState<string>('');
	const [avatarFile, setAvatarFile] = useState<File | null>(null);
	const [avatarPreview, setAvatarPreview] = useState<string | undefined>('');
	const [error, setError] = useState<string | null>(null);
	const { updateUser, loaderState } = useAppData();

	useEffect(() => {
		if (user) {
			setName(user.name);
			setAvatarPreview(user.avatar_url);
		}
	}, [user]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setAvatarFile(file);
			setAvatarPreview(URL.createObjectURL(file));
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!isValidName(name)) {
			setError('Name must be at least 3 characters long.');
			return;
		}

		const formData = new FormData();
		formData.append('name', name);
		if (avatarFile instanceof File) {
			formData.append('avatar', avatarFile);
		}

		try {
			await updateUser(formData);
			closeProfileModal();
		} catch (error: unknown) {
			setError(
				error instanceof Error ? error.message : 'Failed to update profile',
			);
		}
	};

	return (
		<>
			{loaderState && <Loader />}
			{!loaderState && (
				<>
					{isProfileModalOpen && (
						<div className="fixed inset-0 z-40 bg-neutral-900/70">
							<div className="flex h-full w-full justify-center">
								<form
									className="relative top-20 overflow-y-auto flex h-[503px] w-[335px] flex-col gap-y-8 rounded-xl bg-neutral-0 px-5 py-4 shadow-custom tablet:h-[503px] tablet:w-[530px] desktop:h-[530px] desktop:w-[530px]"
									onSubmit={handleSubmit}
								>
									<div className="flex flex-col gap-y-2">
										<div
											className="flex w-full cursor-pointer justify-end text-neutral-300"
											onClick={closeProfileModal}
										>
											<X size={20} />
										</div>

										{error && <ErrorMessage message={error} />}

										<h1 className="text-preset-3-b text-neutral-900">
											Update your profile
										</h1>

										<p className="text-preset-6-r text-neutral-600">
											Personalize your account with your name and photo.
										</p>
									</div>

									<div className="flex flex-col gap-y-5">
										<div className="flex flex-col gap-y-2">
											<label
												htmlFor="name"
												className="text-preset-6-r text-neutral-900"
											>
												Name
											</label>

											<input
												onChange={handleChange}
												name="name"
												value={name}
												type="text"
												id="name"
												placeholder="Jane Appleseed"
												className="rounded-[10px] border border-neutral-300 px-4 py-3 text-preset-6-r text-neutral-900 placeholder-neutral-600 hover:border-neutral-600 focus:outline-blue-600"
											/>
										</div>

										<div className="flex gap-x-5">
											<img
												src={avatarPreview || Avatar}
												alt="Avatar preview"
												className="h-16 w-16 rounded-full object-cover"
											/>

											<div className="flex flex-col">
												<label
													htmlFor="avatar"
													className="flex cursor-pointer flex-col gap-y-4"
												>
													<div className="flex flex-col gap-1">
														<p className="text-preset-6-r text-neutral-900">
															Upload Image
														</p>

														<p className="text-preset-7-r text-neutral-600">
															Max 250KB, PNG or JPEG
														</p>
													</div>

													<div className="w-fit rounded-lg border border-neutral-300 bg-neutral-0 px-4 py-2 text-preset-6-m text-neutral-900">
														Upload
													</div>
												</label>
												<input
													onChange={handleAvatarChange}
													name="avatar"
													type="file"
													id="avatar"
													accept="image/png, image/jpeg"
													className="hidden"
												/>
											</div>
										</div>
									</div>

									<button className="w-full rounded-[10px] bg-blue-600 px-8 py-3 text-preset-5-b text-neutral-0">
										Save Changes
									</button>
								</form>
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default Profile;
