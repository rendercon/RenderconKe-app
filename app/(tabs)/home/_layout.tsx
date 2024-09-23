import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import StyledText from '@/components/common/StyledText';
import MainHeader from '@/components/headers/MainHeader';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof MaterialCommunityIcons>['name']; color: string }) {
  return <MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  //TODO: show tab labels if tab is focussed

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.palette.primary,
          borderTopColor: Colors.palette.primary,
        },
        tabBarActiveTintColor: Colors.palette.secondary,
        tabBarInactiveTintColor: Colors.palette.text,
        tabBarLabelStyle: {
          fontSize: 14,
        },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar-month" color={color} />,
          tabBarLabel: ({ color }) => (
            <StyledText size="base" style={{ color }}>
              Schedule
            </StyledText>
          ),
          headerStyle: {
            backgroundColor: Colors.palette.primary,
            height: 120,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitle: () => <MainHeader />,
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="bookmark-check" color={color} />,
          tabBarLabel: ({ color }) => (
            <StyledText size="base" style={{ color }}>
              Bookmarked
            </StyledText>
          ),
          headerStyle: {
            backgroundColor: Colors.palette.primary,
            height: 120,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitle: () => <MainHeader />,
        }}
      />
      <Tabs.Screen
        name="speakers"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="account-group" color={color} />,
          tabBarLabel: ({ color }) => (
            <StyledText size="base" style={{ color }}>
              Speakers
            </StyledText>
          ),
          headerStyle: {
            backgroundColor: Colors.palette.primary,
            height: 110,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitle: () => <MainHeader />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="information-outline" color={color} />,
          tabBarLabel: ({ color }) => (
            <StyledText size="base" style={{ color }}>
              About
            </StyledText>
          ),
          headerStyle: {
            backgroundColor: Colors.palette.primary,
            height: 120,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitle: () => <MainHeader />,
        }}
      />
    </Tabs>
  );
}
