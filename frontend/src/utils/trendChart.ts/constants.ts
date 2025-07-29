import { Happy, Neutral, Sad, VeryHappy, VerySad } from '../../assets';

export const sleepLabelMap = {
	zero_two: { label: '0-2', value: 2 },
	three_four: { label: '3-4', value: 4 },
	five_six: { label: '5-6', value: 6 },
	seven_eight: { label: '7-8', value: 8 },
	nine_plus: { label: '9+', value: 8 },
};

export const moodIcons = {
	very_sad: VerySad,
	sad: Sad,
	neutral: Neutral,
	happy: Happy,
	very_happy: VeryHappy,
};

export const getColor = (hours: number) => {
	if (hours === 2) return '#FF9B99';
	if (hours === 4) return '#B8B1FF';
	if (hours === 6) return '#89CAFF';
	if (hours === 8) return '#89E780';
	return '#FFC97C';
};

export const formatCheckins = (checkins: any[]) => {
	return checkins
		.slice(0, 6)
		.map((checkin: any) => {
			const sleep = sleepLabelMap[checkin.sleep as keyof typeof sleepLabelMap];
			return {
				date: new Date(checkin.created_at).toLocaleDateString('en-US', {
					month: 'long',
					day: 'numeric',
				}),
				sleep: sleep?.value || 0,
				hoursLabel: sleep?.label || '',
				mood: moodIcons[checkin.mood as keyof typeof moodIcons],
				feelings: (checkin.feelings || []).map((f: { name: string }) => f.name),
			};
		})
		.sort((a, b) => {
			return new Date(a.date).getTime() - new Date(b.date).getTime();
		});
};
