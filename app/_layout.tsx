import React from 'react';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="(tabs)" 
        options={{ 
          headerShown: false,
          title: 'Perfil',
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: 'Perfil',
          headerStyle: {
            backgroundColor: '#6C1ED9',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />
    </Stack>
  );
}
