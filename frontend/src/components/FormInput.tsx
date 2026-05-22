import type { ChangeEvent, FC } from 'react';
import { ErrorMessage } from './';

interface FormInputFace{
	id: string;
	name: string;
	label: string;
	type?: string;
	placeholder?: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	error?: string;
}

const FormInput: FC<FormInputFace> = ({
	id,
	name,
	label,
	type = 'text',
	placeholder,
	value,
	onChange,
	error,
}) => {
	return (
		<div className="flex flex-col gap-y-2">
			<label htmlFor={id} className="text-preset-6-r text-neutral-900">
				{label}
			</label>
			<input
				id={id}
				name={name}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className="text-neutral-900 px-4 py-3 placeholder-neutral-600 rounded-[10px] text-preset-6-r border border-neutral-300 focus:outline-blue-600 hover:border-neutral-600"
			/>
			{error && <ErrorMessage message={error} />}
		</div>
	);
};

export default FormInput;
