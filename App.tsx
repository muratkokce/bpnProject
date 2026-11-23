import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { ThemeProvider } from 'styled-components/native';

import { Loading } from '@/shared/components/loading';

import { RootNavigator } from './src/app/navigation';
import { useTheme } from './src/assets/theme';

const queryClient = new QueryClient();

function ThemedApp() {
  const isDarkMode = useColorScheme() === 'dark';
  const { top } = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        <Loading />
      </ThemeProvider>
      <Toast topOffset={top} />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <ThemedApp />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
