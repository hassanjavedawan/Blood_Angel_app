import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BloodAngel from "../screens/BloodAngel";
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RegisterScreen_2 from '../screens/RegisterScreen_2';


const Stack = createStackNavigator();

function AppNavigation() {
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator>

                    <Stack.Screen options={{ headerShown: false }} name="WelcomeScreen" component={WelcomeScreen} />

                    <Stack.Screen options={{
                        headerShown: true,
                        headerStyle: { backgroundColor: 'red', },
                        headerTitle: 'LOG IN ',
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: 28
                        },
                    }}
                        name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen options={{
                        headerShown: true,
                        headerStyle: { backgroundColor: 'red', },
                        headerTitle: 'Create Account',
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: 28
                        },
                    }} name="RegisterScreen" component={RegisterScreen} />

                    <Stack.Screen options={{
                        headerShown: true,
                        headerStyle: { backgroundColor: 'red', },
                        headerTitle: 'Create Account',
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: 28
                        },
                    }} name="RegisterScreen_2" component={RegisterScreen_2} />

                    <Stack.Screen options={{
                        headerStyle: { backgroundColor: 'red', },
                        headerTitle: 'BLOOD ANGEL',
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 28
                        },
                        headerLeft: null
                    }} name="BloodAngle" component={BloodAngel} />






                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

export default AppNavigation;