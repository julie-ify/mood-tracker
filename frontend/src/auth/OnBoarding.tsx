import Logo from '../assets/logo.svg';
import Avatar from '../assets/Avatar.svg';

const OnBoarding = () => {
	return (
		<div className="flex flex-col justify-center items-center pt-20">
			<div className="pb-8 tablet:pb-12 flex items-center">
				<img src={Logo} alt="Logo icon" className="w-[177px] h-[40px]" />
			</div>
			<form className="bg-neutral-0 mx-4 py-10 px-8 rounded-2xl shadow-custom flex flex-col gap-y-8 tablet:w-[530px] tablet:h-[503px] desktop:w-[530px] desktop:h-[530px]">
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
						<label htmlFor="email" className="text-preset-6-r text-neutral-900">
							Name
						</label>
						<input
							type="text"
							id="email"
							placeholder="Jane Appleseed"
							className="text-neutral-0 px-4 py-3 placeholder-neutral-600 rounded-[10px] text-preset-6-r border border-neutral-300"
						/>
					</div>

					<div className="flex gap-x-5">
						<img
							src={Avatar}
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
								type="file"
								id="avatar"
								accept="image/png, image/jpeg"
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
