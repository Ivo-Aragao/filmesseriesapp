// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { searchMoviesAndSeries } from '../api/tmdb'; // Supondo que você tenha essa função para buscar filmes
import MovieCard from '../components/MovieCard'; // Importando o componente MovieCard
import homeStyles from '../styles/homeStyles'; // Importando os estilos

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentMovies = async () => {
      try {
        // Chamando a API para buscar os filmes mais recentes
        const results = await searchMoviesAndSeries('', 'movie'); // Aqui você pode usar o filtro 'movie' para pegar apenas filmes
        setMovies(results);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentMovies();
  }, []); // Chama assim que a HomeScreen for exibida

  if (loading) {
    return (
      <View style={homeStyles.container}>
        <Text style={homeStyles.title}>Carregando filmes...</Text>
      </View>
    );
  }

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.title}>Filmes Mais Recentes</Text>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={homeStyles.movieList}
      />
    </View>
  );
};

export default HomeScreen;
