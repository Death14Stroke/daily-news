import React, { FC, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { Bar as ProgressBar } from 'react-native-progress';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../models/Themes';

interface Props {
	route: RouteProp<ParamListBase, 'WebView'>;
	navigation: StackNavigationProp<ParamListBase, 'WebView'>;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const WebViewScreen: FC<Props> = ({ route, navigation }) => {
	const { colors } = useTheme();
	const { url }: any = route.params;
	const [progress, setProgress] = useState(0);

	const renderLoading = () => {
		return (
			<ProgressBar
				style={styles.progressStyle}
				progress={progress}
				width={200}
				color={colors.primary}
			/>
		);
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			title: url
		});
	}, [navigation]);

	return (
		<View style={{ flex: 1, alignItems: 'center' }}>
			<WebView
				style={{
					width: SCREEN_WIDTH
				}}
				source={{ uri: url }}
				startInLoadingState={true}
				scalesPageToFit={true}
				javaScriptEnabled
				pullToRefreshEnabled
				renderLoading={renderLoading}
				onLoadProgress={({ nativeEvent }) => {
					console.log(nativeEvent.progress);
					setProgress(nativeEvent.progress);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	progressStyle: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: SCREEN_WIDTH
	}
});

export default WebViewScreen;
