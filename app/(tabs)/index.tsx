import { Stack } from 'expo-router';
import { StyleSheet, View, SafeAreaView, ScrollView, Image, Text, Platform } from 'react-native';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <SafeAreaView style={styles.container}>
        <ScrollView>
            
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
});
