import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ToastAndroid, Platform, Alert } from 'react-native';

const FilmItem = ({ movie, isDarkMode, onPress, onFavorite, isFavorite }) => {
  const handleFavoritePress = () => {
    // Chama a função que adiciona ou remove o filme dos favoritos
    onFavorite(movie);

    // Define a mensagem com base no estado de favorito
    const message = isFavorite
      ? 'Removido dos favoritos'
      : 'Adicionado aos favoritos';

    // Exibe a mensagem de feedback (Android ou iOS)
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('', message);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.movieItem, { backgroundColor: isDarkMode ? '#444' : '#fff' }]}
      onPress={() => onPress(movie)} // Chama a função ao pressionar o item
    >
      <View style={styles.imageContainer}>
        <Image
          source={movie.poster_path
            ? { uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }
            : { uri: 'https://via.placeholder.com/200x300?text=Sem+Imagem' }}
          style={styles.poster}
        />
        {movie.vote_average && (
          <View style={[styles.ratingBadge, { backgroundColor: isDarkMode ? '#222' : '#fff' }]}>
            <Text style={[styles.ratingText, { color: isDarkMode ? '#fff' : '#000' }]}>
              {movie.vote_average.toFixed(1)}
            </Text>
          </View>
        )}
      </View>

      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]} numberOfLines={2}>
        {movie.title || movie.name}
      </Text>

      <TouchableOpacity onPress={handleFavoritePress}>
        <Text style={styles.favoriteText}>{isFavorite ? '⭐' : '☆'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  movieItem: {
    width: '30%',
    margin: '1.5%',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
  },
  imageContainer: {
    position: 'relative',  // Para permitir a sobreposição da nota na imagem
  },
  poster: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 10,
  },
  ratingBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente para a nota
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  favoriteText: {
    fontSize: 24,
    marginTop: 5,
  },
});

export default FilmItem;
