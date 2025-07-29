import type { TooltipProps } from 'recharts';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Cell,
	CartesianGrid,
	LabelList,
	Tooltip,
} from 'recharts';
import { useSelector } from 'react-redux';
import type { RootState } from '../reducer/store.ts';
import {
	getColor,
	formatCheckins,
} from '../utils/trendChart.ts/constants.ts';

const CustomTooltip = (props: TooltipProps<any, any>) => {
	const active = props.active;
	const payload = (props as any).payload;
	if (active && payload && payload.length > 0) {
		const entry = payload[0].payload;
		return (
			<div className="bg-white p-2 border border-gray-300 rounded text-xs shadow">
				<div>
					<strong>Sleep:</strong> {entry.hours}
				</div>
				<div>
					<strong>Date:</strong> {entry.date}
				</div>
				<div>
					<strong>Feelings:</strong> {entry.feelings.join(', ')}
				</div>
			</div>
		);
	}
	return null;
};

const TrendsChart = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const data = formatCheckins(user?.checkins || []);

	const EmojiLabel = (props: { x: number; y: number; index: number }) => {
		const { x, y, index } = props;
		const moodIcon = data[index].mood;
		const barWidth = 40;
		return (
			<image
				href={moodIcon}
				x={x + barWidth / 2 - 12}
				y={y + 6}
				width="24"
				height="24"
			/>
		);
	};

	return (
		<div className="bg-white rounded-2xl px-4 py-5 w-full flex flex-col gap-y-8 shadow">
			<h2 className="text-preset-3-b-mb font-bold text-[#21214D]">
				Mood and sleep trends
			</h2>

			<div style={{ overflowX: 'auto', width: '100%' }}>
				<div style={{ width: 'auto' }}>
					<BarChart
						data={data}
						width={500}
						height={300}
						margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
					>
						<CartesianGrid vertical={false} stroke="#E0E6F4" />
						<YAxis dataKey={'sleep'} />
						<XAxis dataKey={'date'} />
						<Tooltip content={CustomTooltip} />
						<Bar dataKey="sleep" barSize={40} radius={[20, 20, 20, 20]}>
							{data.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={getColor(entry.sleep)} />
							))}
							<LabelList
								dataKey="mood"
								content={<EmojiLabel x={0} y={0} index={0} />}
							/>
						</Bar>
					</BarChart>
				</div>
			</div>
		</div>
	);
};

export default TrendsChart;
