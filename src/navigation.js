import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Admin from './screens/admin';
import Customer from './screens/customer';
import PickMember from './screens/pickMember';
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Pick Member" component={PickMember} />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="Customer" component={Customer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;