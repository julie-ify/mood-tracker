import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Signup, Login, OnBoarding } from './auth';
import { HomePage } from './pages';

const App = () => {
	return (
		<div className="min-h-screen w-screen bg-soft-gradient font-reddit">
			<Routes>
				<Route path="/signup" element={<Signup />} />
				<Route path="/login" element={<Login />} />
				<Route path="/onboarding" element={<OnBoarding />} />
				<Route path="/" element={<HomePage />} />
			</Routes>
		</div>
	);
};

export default App;
