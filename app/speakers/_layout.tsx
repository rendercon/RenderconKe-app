import React from 'react';
import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerTransparent: true,
          headerTintColor: Colors.palette.secondary,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: Colors.palette.primary + 'cc',
          },
        }}
      />
    </Stack>
  );
}
