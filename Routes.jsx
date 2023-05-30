import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Home} from "./Pages/Home";
import {Details} from "./Pages/Details";
export const Routes = () => {
	const Stack = createNativeStackNavigator();

	return (
		<>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="Details" component={Details} />
			</Stack.Navigator>
		</>
	)
}