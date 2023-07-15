import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PickMember from './src/screens/pickMember';
import Navigation from './src/navigation';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

export default function App() {
  return (
    <ActionSheetProvider>
      <Navigation/>
    </ActionSheetProvider>
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
