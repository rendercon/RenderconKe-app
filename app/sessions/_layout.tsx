import React from 'react';
import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';

export default function SessionsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerTransparent: true,
          headerTintColor: Colors.palette.secondary,
          headerStyle: {
            backgroundColor: Colors.palette.primary + 'cc',
          },
        }}
      />
    </Stack>
  );
}
