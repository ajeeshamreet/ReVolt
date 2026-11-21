import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.black,
        tabBarInactiveTintColor: theme.colors.black,
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          borderTopColor: theme.colors.borderLight,
          borderTopWidth: theme.borderWidth.thin,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'map' : 'map-outline'}
              size={theme.iconSize.md}
              color={theme.colors.black}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'book' : 'book-outline'}
              size={theme.iconSize.md}
              color={theme.colors.black}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="recycle"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'leaf' : 'leaf-outline'}
              size={theme.iconSize.md}
              color={theme.colors.black}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'wallet' : 'wallet-outline'}
              size={theme.iconSize.md}
              color={theme.colors.black}
            />
          ),
        }}
      />
    </Tabs>
  );
}
