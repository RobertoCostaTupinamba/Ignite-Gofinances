import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Signin from '../screens/Signin';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Signin" component={Signin} />
    </Navigator>
  );
}
