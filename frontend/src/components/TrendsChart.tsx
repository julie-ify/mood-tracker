{/* eslint-disable @typescript-eslint/no-explicit-any */}

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
import { getColor, formatCheckins } from '../utils/constants.ts';

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

const EmojiLabel = (props: {
	x: number;
	y: number;
	index: number;
	data: any;
}) => {
	const { x, y, index, data } = props;
	const moodIcon = data[index].mood.icon;
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

const TrendsChart = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const data = formatCheckins(user?.checkins || []);

	return (
		<div className="bg-neutral-0 rounded-2xl px-4 py-5 w-full flex flex-col gap-y-8 shadow">
			<h2 className="text-preset-3-b-mb text-neutral-900">
				Mood and sleep trends
			</h2>

			<div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
				<div
					style={{
						width: 60,
						height: 300,
						background: 'transparent',
						zIndex: 2,
						position: 'sticky',
						left: 0,
						top: 0,
					}}
				>
					<BarChart
						data={data}
						width={60}
						height={300}
						margin={{
							top: 20,
							right: 0,
							left: 20,
							bottom: 5,
						}}
					>
						<YAxis
							type="number"
							dataKey="sleep"
							width={40}
							domain={[2, 10]}
							ticks={[2, 4, 6, 8, 10]}
							axisLine={false}
							tickLine={false}
						/>
						{/* Hidden bar for domain calculation */}
						<Bar dataKey="sleep" fill="transparent" />
					</BarChart>
				</div>
				<div style={{ overflowX: 'auto', width: '100%', maxWidth: '1000px' }}>
					<div style={{ width: '100%' }}>
						<BarChart
							data={data}
							width={Math.max(500, data.length * 70)}
							height={300}
							margin={{
								top: 20,
								right: 20,
								left: 0,
								bottom: 5,
							}}
							style={{
								overflow: 'visible',
							}}
						>
							<CartesianGrid vertical={false} stroke="#E0E6F4" />
							<XAxis
								dataKey="date"
								tick={{ fill: '#9393B7', fontSize: 15 }}
								interval={0}
								type="category"
								width={50}
								axisLine={false}
								tickLine={false}
							/>
							<Tooltip content={CustomTooltip} />
							<Bar dataKey="sleep" barSize={40} radius={[20, 20, 20, 20]}>
								{data.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={getColor(entry.sleep)} />
								))}
								<LabelList
									dataKey="mood"
									content={<EmojiLabel x={0} y={0} index={0} data={data} />}
								/>
							</Bar>
						</BarChart>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TrendsChart;
