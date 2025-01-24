import axios from 'axios';
import { API_KEY, TMDB_BASE_URL } from './apiConfig';

const getLatestReleases = async (type) => {
  try {
    const params = {
      api_key: API_KEY,
      language: 'pt-BR',
    };

    let endpoint;

    switch (type) {
      case 'movie':
        endpoint = 'movie/now_playing';  // Lançamentos de filmes
        break;
      case 'tv':
        endpoint = 'tv/on_the_air';  // Lançamentos de séries
        break;
      case 'anime':
        endpoint = 'discover/tv';  // Usando o discover para séries e filtrando por animes
        params.with_genres = 16;  // Gênero 16 é animação (animes)
        break;
      default:
        return [];
    }

    const response = await axios.get(`${TMDB_BASE_URL}${endpoint}`, { params });
    return response.data.results;
  } catch (error) {
    console.error(`Erro ao buscar lançamentos de ${type}:`, error);
    return [];
  }
};

export default getLatestReleases;
