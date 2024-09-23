import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import StyledText from '@/components/common/StyledText';
import MainHeader from '@/components/headers/MainHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { spacing } from '@/constants/Styles';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof MaterialCommunityIcons>['name']; color: string }) {
  return <MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

function CustomHeader() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.headerContainer, { paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg }]}>
      <MainHeader />
    </View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  const headerHeight = 120;

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.palette.primary + 'cc',
          borderTopColor: 'transparent',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
        },
        tabBarActiveTintColor: Colors.palette.secondary,
        tabBarInactiveTintColor: Colors.palette.text,
        tabBarLabelStyle: {
          fontSize: 14,
        },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerTitleContainerStyle: {
          width: '100%',
        },
        headerStyle: {
          height: headerHeight,
        },
        header: () => <CustomHeader />,
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
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.palette.primary + 'CC', // Semi-transparent
    height: 100,
  },
});
