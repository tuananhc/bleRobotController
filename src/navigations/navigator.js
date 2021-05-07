import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ScanningPage from '../screens/scanningPage';
import ControlPage from '../screens/controlPage';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

export default function App() {
  const isBluetoothTurnedOn = false //useSelector(state => state.bluetoothReducer.isBluetoothTurnedOn)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ScanningPage"
          component={ScanningPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ControlPage'
          component={ControlPage}
          options={{
            animationTypeForReplace: isBluetoothTurnedOn ? 'push' : 'pop',
            headerShown: false,
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}