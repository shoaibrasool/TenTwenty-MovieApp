import { StyleSheet, Text, View } from 'react-native';

export default function WatchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Watch</Text>
      {/* Add your watch content here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
