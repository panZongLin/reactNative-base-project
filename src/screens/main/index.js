import React from 'react';
import { Text, View } from 'react-native';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
const defaultNavigationOptions = ({ route }) => ({
	tabBarIcon: ({focused, color, size}) => {
		let iconName;
		if(route.name === 'Home') {
			iconName = focused ? 'pinwheel' : 'pinwheel-outline';
		}else {
			iconName = focused ? 'cards' : 'cards-outline';
		}

		return <MCIcons name={iconName} size={size} color={color} />;
	},
})

class Main extends React.Component {

	render() {
		const { } = this.props;
		return(
			<Tab.Navigator
				// screenOptions={defaultNavigationOptions()} 这样不行为啥
				screenOptions={defaultNavigationOptions}
				tabBarOptions={{
					activeTintColor: 'tomato',
					inactiveTintColor: 'gray',
				}}
			>
				<Tab.Screen name="Home" component={HomeScreen} />
				<Tab.Screen name="Settings" component={SettingsScreen} />
			</Tab.Navigator>
		)
	}
}

export default Main;