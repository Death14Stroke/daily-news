import { StackCardInterpolationProps } from '@react-navigation/stack';

export const horizontalAnimation: {} = {
	cardStyleInterpolator: ({
		current,
		layouts
	}: StackCardInterpolationProps) => {
		return {
			cardStyle: {
				transform: [
					{
						translateX: current.progress.interpolate({
							inputRange: [0, 1],
							outputRange: [layouts.screen.width, 0]
						})
					}
				]
			}
		};
	},
	gestureDirection: 'horizontal'
};
