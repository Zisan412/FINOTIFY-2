import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import {
  Inter_400Regular,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Inter_400Regular,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* 
        MAIN TABS: Disable standard screen transitions (fades/slides)
        to make it feel like a smooth tab-bar experience.
      */}
      <Stack.Screen 
        name="desbord/desbord" 
        options={{ animation: 'none' }} 
      />
      <Stack.Screen 
        name="charts/headr" 
        options={{ animation: 'none' }} 
      />
      <Stack.Screen 
        name="DuePyment/due" 
        options={{ animation: 'none' }} 
      />
      <Stack.Screen 
        name="Usersetting/setting" 
        options={{ animation: 'none' }} 
      />

      {/* 
        OTHER SCREENS: Keep standard push/pull animations for adding data
      */}
      <Stack.Screen 
        name="desbord/adddata" 
        options={{ 
          animation: 'slide_from_bottom',
          presentation: 'modal'
        }} 
      />
    </Stack>
  );
}
