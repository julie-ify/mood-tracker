import { useSelector } from 'react-redux';
import { Pattern } from '../assets';
import { getAverageSleep, formatMoodSleep } from '../utils/constants';
import type { RootState } from '../reducer';
import { ArrowUpRight } from 'lucide-react';

const AverageSleep = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const checkins = formatMoodSleep(user?.checkins || []);
	const averageSleep = getAverageSleep(checkins);
	const sleep = averageSleep ? averageSleep : null;

	return (
		<div className="px-4 flex flex-col gap-y-3">
			<div className="flex items-center gap-x-1">
				<h2 className="text-preset-5-b text-neutral-900">Average Sleep</h2>
				<span className="text-preset-7-r text-neutral-600">
					(Last 5 Check-ins)
				</span>
			</div>

			<div
				className={`flex flex-col justify-center gap-y-3 ${
					sleep ? 'bg-blue-600 text-neutral-0' : 'bg-blue-100 text-neutral-900'
				} rounded-2xl px-4 py-5 h-[150px] relative border border-black`}
			>
				<img
					src={Pattern}
					alt="Pattern"
					className="w-[61px] h-[151px] absolute right-0 bottom-0 top-0"
				/>

				{sleep ? (
					<div className="custom-text-shadow flex flex-col gap-y-3">
						<div className="flex gap-x-3 items-center">
							<img src={sleep.icon} alt="Sleep icon" className="w-6 h-6" />
							<h2 className="text-preset-4-b">{sleep.hours} Hours</h2>
						</div>
						<div className="flex gap-x-2 opacity-70">
							<ArrowUpRight />
							<p className="text-preset-7-r">
								Increase from the previous 5 checkins
							</p>
						</div>
					</div>
				) : (
					<div>
						<h2 className="text-preset-4-sb">Not enough data yet!</h2>
						<p className="text-preset-7-r">
							Log 5 nights to view average sleep
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default AverageSleep;
