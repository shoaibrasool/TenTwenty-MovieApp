import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SearchResultCard } from '../../components/SearchResultCard';

const MOVIES = [
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
  {
    id: '5',
    title: 'Jojo Rabbit',
    uri: 'https://image.tmdb.org/t/p/w500/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg',
  },
];

const CATEGORIES = [
  { id: '1', name: 'Action', image: 'https://image.tmdb.org/t/p/w500/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg' },
  { id: '2', name: 'Adventure', image: 'https://image.tmdb.org/t/p/w500/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg' },
  { id: '3', name: 'Animation', image: 'https://image.tmdb.org/t/p/w500/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg' },
  { id: '4', name: 'Comedy', image: 'https://image.tmdb.org/t/p/w500/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg' },
  { id: '5', name: 'Crime', image: 'https://image.tmdb.org/t/p/w500/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg' },
  { id: '6', name: 'Documentary', image: 'https://image.tmdb.org/t/p/w500/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg' },
  { id: '7', name: 'Drama', image: 'https://image.tmdb.org/t/p/w500/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg' },
  { id: '8', name: 'Family', image: 'https://image.tmdb.org/t/p/w500/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg' },
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const searchWidth = React.useRef(new Animated.Value(36)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setIsSearching(text.length > 0);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  const toggleSearch = () => {
    if (isSearchOpen) {
      // Collapse search
      Animated.parallel([
        Animated.timing(searchWidth, {
          toValue: 36,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setSearchQuery('');
        setIsSearchOpen(false);
        setIsSearching(false);
      });
    } else {
      setIsSearchOpen(true);
      // Expand search
      Animated.parallel([
        Animated.timing(searchWidth, {
          toValue: 200,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        {!isSearchOpen ? (
          <Text style={styles.title}>Watch</Text>
        ) : (
          <Animated.View style={[styles.searchContainer, { width: '100%' }]}>
            <View style={styles.searchInputContainer}>
              <Feather name="search" size={20} color="#666" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="TV shows, movies and more"
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={handleSearch}
                autoFocus={true}
                clearButtonMode="never"
              />
              <TouchableOpacity onPress={toggleSearch} style={styles.clearButton}>
                <Feather name="x" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
        {!isSearchOpen && (
          <TouchableOpacity
            onPress={toggleSearch}
            style={styles.searchButton}
          >
            <Feather name="search" size={20} color="#111" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        {isSearching ? (
          <FlatList
            data={MOVIES.filter(movie =>
              movie.title.toLowerCase().includes(searchQuery.toLowerCase())
            )}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SearchResultCard
                item={{
                  ...item,
                  category: 'Action/Adventure' 
                }}
                onPressOptions={() => {
                  console.log('Options pressed for:', item.title);
                }}
              />
            )}
            contentContainerStyle={styles.searchResultsList}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No results found</Text>
              </View>
            }
          />
        ) : isSearchOpen ? (
          <ScrollView style={styles.categoriesContainer}>
            <View style={styles.categoriesGrid}>
              {CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={styles.categoryItem}
                  activeOpacity={0.8}
                >
                  <Image
                    source={{ uri: category.image }}
                    style={styles.categoryImage}
                    resizeMode="cover"
                  />
                  <View style={styles.categoryOverlay} />
                  <Text style={styles.categoryText}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        ) : (
          <FlatList
            data={MOVIES}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Card item={item} />}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}
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
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111',
    paddingVertical: 13
  },
  searchContainer: {
    flex: 1,
    height: 52,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 30,
    paddingHorizontal: 12,
    height: '100%',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#111',
    padding: 0,
    margin: 0,
  },
  clearButton: {
    marginLeft: 8,
    padding: 4,
  },
  searchResultsList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  searchButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  categoriesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  categoriesTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111',
    marginBottom: 20,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  categoryOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  categoryText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    paddingHorizontal: 8,
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
