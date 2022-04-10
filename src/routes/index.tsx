import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { useAuth } from '../hooks/auth';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

function Routes() {
  const { user } = useAuth();
  return <NavigationContainer>{user.id ? <AppRoutes /> : <AuthRoutes />}</NavigationContainer>;
}

export default Routes;
