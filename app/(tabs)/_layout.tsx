import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#827D88',
          headerShown: false,
          tabBarShowLabel: true,
          tabBarButton: HapticTab,
          tabBarStyle: {
            position: 'absolute',
            left: 20,
            right: 20,
            height: 70,
            borderRadius: 20,
            backgroundColor: '#2E2739',
            borderTopWidth: 0,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            paddingHorizontal: 10,
          },
          tabBarItemStyle: {
            height: 60,
            paddingVertical: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'System',
            fontWeight: '500',
            marginBottom: 5,
          },
        }}>
        <Tabs.Screen
          name="dashboard"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ focused, color }) => (
              <MaterialCommunityIcons 
                name={focused ? 'view-dashboard' : 'view-dashboard-outline'} 
                size={24} 
                color={color} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="watch"
          options={{
            title: 'Watch',
            tabBarIcon: ({ focused, color }) => (
              <MaterialCommunityIcons 
                name={focused ? 'play-box' : 'play-box-outline'} 
                size={24} 
                color={color} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="media-library"
          options={{
            title: 'Media Library',
            tabBarIcon: ({ focused, color }) => (
              <MaterialCommunityIcons 
                name={focused ? 'image-multiple' : 'image-multiple-outline'} 
                size={24} 
                color={color} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="more"
          options={{
            title: 'More',
            tabBarIcon: ({ focused, color }) => (
              <MaterialCommunityIcons 
                name={focused ? 'dots-horizontal' : 'dots-horizontal'} 
                size={24} 
                color={color} 
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
