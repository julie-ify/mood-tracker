import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Signup, Login, OnBoarding } from './auth';
import { Dashboard } from './pages';
import { useAppData } from './hooks';
import { Loader, PrivateRoute } from './components';

const App = () => {
	const { fetchUser } = useAppData();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const hydrateUser = async () => {
			try {
				const token = localStorage.getItem('token');
				if (token) {
					await fetchUser(token);
				}
			} catch (err) {
				console.error('Auth hydration failed:', err);
			} finally {
				setLoading(false);
			}
		};

		hydrateUser();
	}, []);

	if (loading) {
		return <Loader />;
	}

	return (
		<div className="min-h-screen w-screen bg-soft-gradient font-reddit">
			<Routes>
				<Route
					path="/"
					element={
						<PrivateRoute>
							<Dashboard />
						</PrivateRoute>
					}
				/>
				<Route path="/signup" element={<Signup />} />
				<Route path="/login" element={<Login />} />
				<Route path="/onboarding" element={<OnBoarding />} />
			</Routes>
		</div>
	);
};

export default App;
