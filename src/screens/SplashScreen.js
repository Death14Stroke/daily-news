import React, { useContext, useEffect, useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Context as SourceContext } from '../context/SourceContext';

const SplashScreen = ({ children }) => {
	const [loading, setIsLoading] = useState(true);
	const { fetchSources } = useContext(SourceContext);

	useEffect(() => {
		fetchSources({ country: 'in', language: 'en' }, () => {
			setIsLoading(false);
		});
	}, []);

	if (loading) {
		return <AppLoading />;
	}

	return children;
};

export default SplashScreen;
