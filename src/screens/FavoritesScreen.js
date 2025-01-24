import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSettings } from '../context/SettingsContext'; // Importando o contexto
import FavoriteItem from '../components/FavoriteItem'; // Importando o componente FavoriteItem
import MovieModal from '../components/MovieModal'; // Importando o componente MovieModal
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando AsyncStorage
import { getDetails } from '../services/tmdbApi'; // Importando a função getDetails

const FavoritesScreen = ({ isDarkMode }) => {
  const { language } = useSettings(); // Pegando a linguagem do contexto
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]); // Adiciona o estado de favoritos

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          const parsedFavorites = JSON.parse(storedFavorites).map((item) => ({
            ...item,
            media_type: item.media_type || (item.title ? 'movie' : 'tv'), // Garantir o media_type
          }));
          setFavorites(parsedFavorites);
        }
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      }
    };
  
    loadFavorites();
  }, []);
  

  const handleMoviePress = async (movie) => {
    const mediaType = movie.media_type || (movie.title ? 'movie' : 'tv'); // Identifica o tipo de mídia corretamente
    const details = await getDetails(movie.id, mediaType, language);
    setSelectedMovie(details);
  };
  

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>
        {language === 'pt-BR' ? 'Favoritos' : language === 'en-US' ? 'Favorites' : 'Favoritos'}
      </Text>

      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <FavoriteItem movie={item} onPress={handleMoviePress} isDarkMode={isDarkMode} />
          )}
        />
      ) : (
        <Text style={[styles.emptyMessage, { color: isDarkMode ? '#ddd' : '#555' }]}>
          {language === 'pt-BR' ? 'Você ainda não adicionou nenhum favorito.' : language === 'en-US' ? 'You haven\'t added any favorites yet.' : 'Aún no has añadido favoritos.'}
        </Text>
      )}

      {/* Modal para mostrar as informações detalhadas do filme */}
      {selectedMovie && (
        <MovieModal
          selectedMovie={selectedMovie}
          isDarkMode={isDarkMode}
          onClose={closeModal}
          language={language}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FavoritesScreen;
