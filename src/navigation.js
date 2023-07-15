import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Admin from './screens/admin/admin';
import Customer from './screens/customer/customer';
import PickMember from './screens/pickMember';
import { NavigationContainer } from "@react-navigation/native";
import Checkout from './screens/customer/checkout';
import CustomizeDonut from './screens/customer/customizeDonut';
import DonutDashboard from './screens/admin/donutDashboard';
import OrderDetails from './screens/admin/order';
import OrderList from './screens/admin/orderList';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Pick Member" component={PickMember} />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="Customer" component={Customer} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="CustomizeDonut" component={CustomizeDonut} />
        <Stack.Screen name="DonutDashboard" component={DonutDashboard} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
        <Stack.Screen name="OrderList" component={OrderList} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;