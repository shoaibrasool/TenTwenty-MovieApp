import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SearchResultCardProps {
  item: {
    id: string;
    title: string;
    category: string;
    uri: string;
  };
  onPressOptions?: () => void;
}

export function SearchResultCard({ item, onPressOptions }: SearchResultCardProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.uri }} style={styles.poster} resizeMode="cover" />

      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {item.title}
          </Text>
          <Text style={styles.category}>
            {item.category}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.optionsButton}
        onPress={onPressOptions}
        activeOpacity={0.7}
      >
        <Feather name="more-vertical" size={20} color="#61C3F2" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    marginBottom: 20,
  },
  poster: {
    width: 130,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    color: '#DBDBDF',
    fontWeight: '400',
  },
  optionsButton: {
    padding: 8,
    marginLeft: 8,
    color: '#61C3F2',
  },
});
