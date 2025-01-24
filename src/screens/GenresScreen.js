// src/screens/GenresScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';
import { useSettings } from '../context/SettingsContext'; // Importando o contexto
import GenreButton from '../components/GenreButton'; // Importando o componente GenreButton
import genresStyles from '../styles/genresStyles'; // Importando os estilos

const API_KEY = 'f463178ac8449526938e802f20a75cd0';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3/';

const GenresScreen = ({ onSelectGenre, isDarkMode }) => {
  const { language } = useSettings(); // Pegando a linguagem do contexto
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${TMDB_BASE_URL}genre/movie/list`, {
          params: { api_key: API_KEY, language: language },
        });
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, [language]); // Recarrega os gêneros quando a linguagem mudar

  const renderItem = ({ item }) => (
    <GenreButton genre={item} onPress={onSelectGenre} isDarkMode={isDarkMode} />
  );

  return (
    <View style={[genresStyles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
      <Text style={[genresStyles.title, { color: isDarkMode ? '#fff' : '#000' }]}>
        {language === 'pt-BR' ? 'Gêneros' : language === 'en-US' ? 'Genres' : 'Géneros'}
      </Text>
      <FlatList
        data={genres}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default GenresScreen;
