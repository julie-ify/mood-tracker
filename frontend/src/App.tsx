import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Signup, Login, OnBoarding, Profile } from './auth';
import { Dashboard } from './pages';
import { useAppData } from './hooks';
import { Loader, PrivateRoute } from './components';

const App = () => {
	const { fetchUser } = useAppData();
	const [loading, setLoading] = useState(true);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

	const toggleMenu = (): void => {
		setIsMenuOpen(!isMenuOpen);
	};

	const modalHandler = (): void => {
		setIsProfileModalOpen(!isProfileModalOpen);
	};

	const closeProfileModal = (): void => {
		setIsProfileModalOpen(false);
		toggleMenu();
	};

	useEffect(() => {
		// Hydrate user data on app load
		const hydrateUser = async () => {
			try {
				const token = localStorage.getItem('token');
				if (token) {
					await fetchUser(token);
				}
			} catch (error) {
				console.error(error instanceof Error ? error.message : 'Failed to fetch user');
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
		<div className="min-h-screen w-screen bg-soft-gradient font-reddit relative">
			<Profile
				closeProfileModal={closeProfileModal}
				isProfileModalOpen={isProfileModalOpen}
			/>
			<Routes>
				<Route path="/" element={<Navigate to="/dashboard" replace />} />
				<Route
					path="/dashboard"
					element={
						<PrivateRoute>
							<Dashboard
								modalHandler={modalHandler}
								isMenuOpen={isMenuOpen}
								toggleMenu={toggleMenu}
							/>
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
