import { Tabs } from 'expo-router';
import React from 'react';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      headerShown: false,
      tabBarButton: ({ pressColor, hoverEffect, ...props }) => (
        <HapticTab
          {...props}
          pressColor={typeof pressColor === 'string' ? pressColor : undefined}
          hoverEffect={hoverEffect && {
            ...hoverEffect,
            color: typeof hoverEffect.color === 'string' ? hoverEffect.color : undefined,
          }}
        />
      ),
    }}>
      <Tabs.Screen name="index" options={{
        title: 'Pontos',
        tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={typeof color === 'string' ? color : Colors[colorScheme ?? 'light'].tint} />,
      }} />
      <Tabs.Screen name="explore" options={{
        title: 'Doações',
        tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={typeof color === 'string' ? color : Colors[colorScheme ?? 'light'].tint} />,
      }} />
      <Tabs.Screen name="favoritos" options={{
        title: 'Favoritos',
        tabBarIcon: ({ color }) => <IconSymbol size={28} name="heart.fill" color={typeof color === 'string' ? color : Colors[colorScheme ?? 'light'].tint} />,
      }} />
    </Tabs>
  );
}
