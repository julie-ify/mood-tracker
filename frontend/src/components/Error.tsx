import { Hint } from '../assets';

interface ErrorFace {
	message: string;
}
const Error = (props: ErrorFace) => {
	return (
		<div className="flex flex-row gap-x-2">
			<img src={Hint} alt="Hint Icon" className="w-[12px] h-[12px]" />
			<span className="text-preset-9-r text-red-700">{props.message}</span>
		</div>
	);
};

export default Error;
