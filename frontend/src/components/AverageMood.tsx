import { Pattern } from '../assets';
import { ArrowStraight } from '../assets';
import { useSelector } from 'react-redux';
import type { RootState } from '../reducer/store.ts';
import { formatMoodSleep, getAverageMood } from '../utils/constants.ts';

const AverageMood = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const checkins = formatMoodSleep(user?.checkins || []);
	const averageMood = getAverageMood(checkins);
	const mood = averageMood ? averageMood : null;

	return (
		<section className="px-4 flex flex-col gap-y-3">
			<div className="flex items-center gap-x-1">
				<h2 className="text-preset-5-b text-neutral-900">Average Mood</h2>
				<span className="text-preset-7-r text-neutral-600">
					(Last 5 check-ins)
				</span>
			</div>

			<div
				className={`flex flex-col justify-center gap-y-3 ${
					mood ? `${mood.color}` : 'bg-blue-100'
				} rounded-2xl px-4 py-5 h-[150px] relative`}
			>
				<img
					src={Pattern}
					alt="Pattern"
					className="w-[61px] h-[151px] absolute right-0 bottom-0 top-0"
				/>

				<div className="flex gap-x-3 items-center">
					{mood && <img src={mood.icon} alt="Mood icon" className="w-6 h-6" />}
					<h2 className="text-preset-4-b text-neutral-900">
						{mood ? mood.label : 'Keep tracking!'}
					</h2>
				</div>

				<div className="text-preset-7-r text-neutral-900">
					{mood ? (
						<div className="flex gap-x-2 items-center">
							<img src={ArrowStraight} alt="Arrow straight" />
							<p>Same as the previous 5 check-ins</p>
						</div>
					) : (
						<p>Log 5 check-ins to see your average mood</p>
					)}
				</div>
			</div>
		</section>
	);
};

export default AverageMood;
