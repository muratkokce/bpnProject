import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';

import { RootNavigator } from './src/app/navigation';
import { useTheme } from './src/assets/theme';

function ThemedApp() {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}

function App() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <ThemedApp />
    </SafeAreaProvider>
  );
}

export default App;
