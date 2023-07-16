import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/navigation';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { NativeBaseProvider } from 'native-base'

export default function App() {
  return (
    <NativeBaseProvider>
     <Provider store={store}>
      <ActionSheetProvider>
        <Navigation/>
      </ActionSheetProvider>
     </Provider>
     </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
