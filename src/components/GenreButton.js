// src/components/GenreButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const GenreButton = ({ genre, onPress, isDarkMode }) => {
  return (
    <TouchableOpacity 
      style={[styles.genreButton, { backgroundColor: isDarkMode ? '#444' : '#333' }]} 
      onPress={() => onPress(genre.id)}
    >
      <Text style={[styles.genreText, { color: isDarkMode ? '#fff' : '#fff' }]}>
        {genre.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  genreButton: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  genreText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default GenreButton;
