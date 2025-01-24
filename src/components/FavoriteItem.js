// src/components/FavoriteItem.js
import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const FavoriteItem = ({ movie, onPress, isDarkMode }) => {
  return (
    <TouchableOpacity
      style={[styles.favoriteItem, { backgroundColor: isDarkMode ? '#444' : '#fff' }]}
      onPress={() => onPress(movie)}
    >
      <Image
        source={{
          uri: movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : 'https://via.placeholder.com/200x300?text=Sem+Imagem',
        }}
        style={styles.poster}
      />
      <Text style={[styles.favoriteText, { color: isDarkMode ? '#fff' : '#000' }]}>
        {movie.title || movie.name || 'Sem título'}
      </Text>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  poster: {
    width: 50,
    height: 75,
    marginRight: 10,
    borderRadius: 5,
  },
  favoriteText: {
    fontSize: 18,
    flex: 1,
  },
});

export default FavoriteItem;
