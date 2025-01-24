// src/components/MovieItem.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MovieItem = ({ movie }) => {
  return (
    <View style={styles.movieCard}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.movieImage}
      />
      <Text style={styles.movieTitle}>{movie.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  movieCard: {
    margin: 10,
    width: 150,
    alignItems: 'center',
  },
  movieImage: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },
  movieTitle: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MovieItem;
