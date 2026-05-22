import {
	Happy,
	Neutral,
	SleepStatusIcon,
	Sad,
	VeryHappy,
	VerySad,
} from '../assets';
import type { Checkin, AverageCheckin, FeelingFace } from '../interfaces/types';
type MoodKey = keyof typeof moodData;
type SleepKey = keyof typeof sleepData;

export const moodData = {
	very_sad: { icon: VerySad, value: 1, label: 'Very Sad', color: 'bg-red-300' },
	sad: { icon: Sad, value: 2, label: 'Sad', color: 'bg-indigo-200' },
	neutral: { icon: Neutral, value: 3, label: 'Neutral', color: 'bg-blue-300' },
	happy: { icon: Happy, value: 4, label: 'Happy', color: 'bg-green-300' },
	very_happy: {
		icon: VeryHappy,
		value: 5,
		label: 'Very Happy',
		color: 'bg-amber-300',
	},
} as const;

export const sleepData = {
	zero_two: { hours: '0-2', sleep: 2, icon: SleepStatusIcon, value: 1 },
	three_four: { hours: '3-4', sleep: 4, icon: SleepStatusIcon, value: 2 },
	five_six: { hours: '5-6', sleep: 6, icon: SleepStatusIcon, value: 3 },
	seven_eight: { hours: '7-8', sleep: 8, icon: SleepStatusIcon, value: 4 },
	nine_plus: { hours: '9+', sleep: 9, icon: SleepStatusIcon, value: 5 },
};

interface SleepData {
	hours: string;
	sleep: number;
	icon: string;
	value: number;
}

interface MoodData {
	icon: string;
	value: number;
	label: string;
	color: string;
}

export const getColor = (hours: number) => {
	if (hours === 2) return '#FF9B99';
	if (hours === 4) return '#B8B1FF';
	if (hours === 6) return '#89CAFF';
	if (hours === 8) return '#89E780';
	return '#FFC97C';
};

export const getAverageSleep = (
	checkins: AverageCheckin[]
): SleepData | null => {
	if (!checkins.length) return null;

	const total = checkins.reduce(
		(sum, { sleep }) => sum + sleepData[sleep as SleepKey].value,
		0
	);
	const avg = Math.floor(total / checkins.length);

	const matchedSleep = Object.entries(sleepData).find(
		([, data]) => data.value === avg
	);

	return matchedSleep ? matchedSleep[1] : null;
};

export const getAverageMood = (moods: AverageCheckin[]): MoodData | null => {
	if (!moods.length) return null;

	const total = moods.reduce(
		(sum, { mood }) => sum + moodData[mood as MoodKey].value,
		0
	);
	const avg = Math.floor(total / moods.length);

	const matchedMood = Object.entries(moodData).find(
		([, data]) => data.value === avg
	);

	return matchedMood ? matchedMood[1] : null;
};

export const formatCheckins = (checkins: Checkin[]) => {
	const sorted = [...checkins].sort(
		(a, b) =>
			new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
	);

	// return sorted.slice(0, 5).map((checkin) => {
	return sorted.map((checkin) => {
		const sleep = sleepData[checkin.sleep as keyof typeof sleepData];
		const icon = sleep?.icon;
		const localDate = new Date(checkin.created_at);

		return {
			date: localDate.toLocaleDateString('en-US', {
				month: 'long',
				day: 'numeric',
			}),
			sleep: sleep?.sleep || 0,
			hours: sleep?.hours || '',
			mood: moodData[checkin.mood as keyof typeof moodData],
			icon,
			feelings: (checkin.feelings || []).map((f: FeelingFace) => f.name),
		};
	});
};

export const formatMoodSleep = (checkins: Checkin[]) => {
	const sorted = [...checkins].sort(
		(a, b) =>
			new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
	);

	return sorted.slice(0, 5).map((checkin) => {
		const localDate = new Date(checkin.created_at);

		return {
			date: localDate.toLocaleDateString('en-US', {
				month: 'long',
				day: 'numeric',
			}),
			sleep: checkin.sleep,
			mood: checkin.mood,
		};
	});
};
