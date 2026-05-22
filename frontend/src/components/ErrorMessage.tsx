import { Hint } from '../assets';

interface ErrorMessageFace {
	message: string;
}

const ErrorMessage = ({ message }: ErrorMessageFace) => {
	return (
		<div className="flex flex-row gap-x-2">
			<img src={Hint} alt="Hint Icon" className="w-[12px] h-[12px]" />
			<span className="text-preset-9-r text-red-700">{message}</span>
		</div>
	);
};

export default ErrorMessage;
