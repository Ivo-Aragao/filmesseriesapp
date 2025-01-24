// src/screens/MovieList.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, Linking, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importação corrigida
import { useSettings } from '../context/SettingsContext';
import FilmItem from '../components/FilmItem';
import MovieDetailsModal from '../components/MovieDetailsModal';
import { getDetails } from '../api/tmdb';

const MovieList = ({ movies, onFavorite, isDarkMode }) => {
  const { language } = useSettings();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [showCast, setShowCast] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      }
    };
    loadFavorites();
  }, []);

  const handleMoviePress = async (movie) => {
    setSelectedMovie(movie);
    const mediaType = movie.media_type || (movie.title ? 'movie' : 'tv');
    const details = await getDetails(movie.id, mediaType);
  
    // Processar diretores e adicionar ao objeto `details`
    const directors = details.directors || []; // Os diretores estão sendo retornados diretamente do `getDetails`
    
    setMovieDetails({
      ...details,
      directors: directors, // Garantindo que os diretores sejam passados corretamente
    });
  };
  
  

  const closeModal = () => {
    setSelectedMovie(null);
    setMovieDetails(null);
    setShowCast(false);
  };

  const handleFavoritePress = async (movie) => {
    try {
      const isFavorite = favorites.some((fav) => fav.id === movie.id);
  
      let updatedFavorites;
      if (isFavorite) {
        updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
      } else {
        const mediaType = movie.media_type || (movie.title ? 'movie' : 'tv');
        updatedFavorites = [...favorites, { ...movie, media_type: mediaType }];
      }
  
      // Atualize a lista de favoritos
      setFavorites(updatedFavorites);
  
      // Salve os favoritos no AsyncStorage
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  
      onFavorite(movie); // Notifique o componente pai, se necessário
    } catch (error) {
      console.error('Erro ao atualizar favoritos:', error);
    }
  };  
  

  const handleTrailerPress = (trailerKey) => {
    const trailerUrl = `https://www.youtube.com/watch?v=${trailerKey}`;
    Linking.openURL(trailerUrl).catch((err) => console.error('Failed to open trailer:', err));
  };

  const renderItem = ({ item }) => {
    const isFavorite = favorites.some((fav) => fav.id === item.id);
    return (
      <FilmItem
        movie={item}
        isDarkMode={isDarkMode}
        onPress={handleMoviePress}
        onFavorite={handleFavoritePress}
        isFavorite={isFavorite}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContainer}
        numColumns={3} // Configura o layout para 3 colunas
      />
      {selectedMovie && movieDetails && (
        <MovieDetailsModal
          movieDetails={movieDetails}
          selectedMovie={selectedMovie}
          showCast={showCast}
          isDarkMode={isDarkMode}
          language={language}
          closeModal={closeModal}
          handleTrailerPress={handleTrailerPress}
          setShowCast={setShowCast}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    padding: 10,
    justifyContent: 'space-between',
  },
});

export default MovieList;
