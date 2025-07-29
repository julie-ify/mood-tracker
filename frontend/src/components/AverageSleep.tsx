import { Pattern } from '../assets';

const AverageSleep = () => {
	return (
		<div className="px-4 flex flex-col gap-y-3">
			<div className="flex items-center gap-x-1">
				<h2 className="text-preset-5-b text-neutral-900">Average Sleep</h2>
				<span className="text-preset-7-r text-neutral-600">
					(Last 5 Check-ins)
				</span>
			</div>
			<div className="flex flex-col justify-center gap-y-3 bg-blue-100 rounded-2xl px-4 py-5 h-[150px] relative">
				<img
					src={Pattern}
					alt="Pattern"
					className="w-[61px] h-[151px] absolute right-0 bottom-0 top-0"
				/>
				<h2 className="text-preset-4-sb text-neutral-900">
					Not enough data yet!
				</h2>
				<p className="text-preset-7-r text-neutral-900">
					Log 5 nights to view average sleep
				</p>
			</div>
		</div>
	);
};

export default AverageSleep;
