import React from 'react';
import { Stack } from 'expo-router';
// import Colors from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="create"
        options={{
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'rgba(0,0,0,0.4)',
          },
          headerTintColor: Colors.palette.text,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="[event]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="play"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          headerTransparent: true,
          headerTintColor: Colors.palette.text,
        }}
      /> */}
    </Stack>
  );
}
