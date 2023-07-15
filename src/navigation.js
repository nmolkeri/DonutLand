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
import { Pressable } from 'react-native';
import { Text } from 'react-native';
import AddEditDonut from './screens/admin/addDonut';
import AddEditTopping from './screens/admin/addTopping';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Pick Member" component={PickMember} />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="OrderList" component={OrderList} />
        <Stack.Screen 
                name="DonutDashboard" 
                component={DonutDashboard}
                options={({navigation}) => ({
                    headerRight: () => (
                        <Pressable onPress={() => navigation.navigate("AddEditDonut")} >
                            <Text>Add/Edit</Text>
                        </Pressable>
                        ),
                    })}
                    />
        <Stack.Screen 
            name="OrderDetails" 
            component={OrderDetails}
            options={{presentation: "modal"}}
        />
        <Stack.Screen 
                name="Customer" 
                component={Customer}
                options={({navigation}) => ({
                    headerRight: () => (
                        <Pressable onPress={() => navigation.navigate("Checkout")} >
                            <Text>Checkout</Text>
                        </Pressable>
                        ),
                    })}
                    />
        <Stack.Screen 
            name="CustomizeDonut" 
            component={CustomizeDonut}
            options={{presentation: "modal"}}
        />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="AddEditDonut" component={AddEditDonut} />
        <Stack.Screen name="AddEditTopping" component={AddEditTopping} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;