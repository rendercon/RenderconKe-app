import React from 'react';
import { Stack } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="speakers"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
