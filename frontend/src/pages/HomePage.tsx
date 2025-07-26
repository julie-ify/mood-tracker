import { useSelector } from 'react-redux';
import type { RootState } from '../reducer/store.ts';

const HomePage = () => {
	const { email } = useSelector((state: RootState) => state.user);
	return (
		<div>
			<h1>Hello</h1>
			<p>{email}</p>
		</div>
	);
};

export default HomePage;
