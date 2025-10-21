import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const DATA = [
  {
    id: '1',
    title: 'Free Guy',
    uri: 'https://image.tmdb.org/t/p/w500/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg',
  },
  {
    id: '2',
    title: "The King's Man",
    uri: 'https://image.tmdb.org/t/p/w500/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg',
  },
  {
    id: '3',
    title: 'Jojo Rabbit',
    uri: 'https://image.tmdb.org/t/p/w500/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg',
  },
  {
    id: '4',
    title: 'Jojo Rabbit',
    uri: 'https://image.tmdb.org/t/p/w500/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg',
  },
];

function Card({ item }: { item: { id: string; title: string; uri: string } }) {
  return (
    <TouchableOpacity activeOpacity={0.85} style={styles.card}>
      <Image source={{ uri: item.uri }} style={styles.poster} resizeMode="cover" />
      <View style={styles.overlay} />
      <Text style={styles.cardTitle}>{item.title}</Text>
    </TouchableOpacity>
  );
}

export default function WatchScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Watch</Text>
        <TouchableOpacity accessibilityRole="button" style={styles.searchButton}>
          <Feather name="search" size={20} color="#111" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Card item={item} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#eae9eb',
    borderRadius: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 14,
    backgroundColor:'#fff'
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111',
  },
  searchButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    height: '80%',
    paddingTop: 26,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    height: 150,
    borderRadius: 14,
    backgroundColor: '#ddd',
    marginBottom: 18,
    overflow: 'hidden',
  },
  poster: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  cardTitle: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});
