import './App.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './auth/Signup.tsx';
import Login from './auth/Login.tsx';
import OnBoarding from './auth/OnBoarding.tsx';
import HomePage from './pages/HomePage';

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
