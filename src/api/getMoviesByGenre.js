import axios from 'axios';
import { API_KEY, TMDB_BASE_URL } from './apiConfig';

export const getMoviesByGenre = async (genreId, type = 'movie') => {
  try {
    const endpoint = type === 'movie' ? 'discover/movie' : 'discover/tv';

    const response = await axios.get(`${TMDB_BASE_URL}${endpoint}`, {
      params: {
        api_key: API_KEY,
        with_genres: genreId,
        language: 'pt-BR',
      },
    });

    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar conteúdo por gênero:', error);
    return [];
  }
};
