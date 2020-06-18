import React from 'react';
import { Text, View } from 'react-native';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Home!</Text>
		</View>
	);
}
  
function SettingsScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Settings!</Text>
		</View>
	);
}

//Tab.Navigator
const Tab = createBottomTabNavigator();
const defaultNavigationOptions = (route) => ({
	tabBarIcon: ({focused, color, size}) => {
		console.log('route', route)
		let iconName;
		if (route.name === 'Home') {
			iconName = focused ? 'pinwheel' : 'pinwheel-outline';
		} else if (route.name === 'Settings') {
			iconName = focused ? 'pinwheel-outline' : 'pinwheel';
		}

		return <MCIcons name={iconName} size={size} color={color} />;
	},
})

class Main extends React.Component {

	render() {
		const { route } = this.props;
		return(
			<NavigationContainer independent={true}>
				<Tab.Navigator
					screenOptions={defaultNavigationOptions(route)}
					tabBarOptions={{
						activeTintColor: 'tomato',
						inactiveTintColor: 'gray',
					}}
				>
					<Tab.Screen name="Home" component={HomeScreen} />
					<Tab.Screen name="Settings" component={SettingsScreen} />
				</Tab.Navigator>
			</NavigationContainer>
		)
	}
}

export default Main;