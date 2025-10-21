import { StyleSheet, Text, View } from 'react-native';

export default function MediaLibraryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Media Library</Text>
      {/* Add your media library content here */}
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
