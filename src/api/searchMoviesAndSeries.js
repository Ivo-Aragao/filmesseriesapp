import axios from 'axios';
import { API_KEY, TMDB_BASE_URL } from './apiConfig';
import getLatestReleases from './getLatestReleases';

export const searchMoviesAndSeries = async (query = '', type = 'multi') => {
  if (query.trim() === '') {
    return await getLatestReleases(type);
  }

  let endpoint;

  switch (type) {
    case 'movie':
      endpoint = 'search/movie';
      break;
    case 'tv':
      endpoint = 'search/tv';
      break;
    case 'anime':
      endpoint = 'search/tv';
      break;
    default:
      endpoint = 'search/multi';
  }

  try {
    const params = {
      api_key: API_KEY,
      query: query.trim(),
      language: 'pt-BR',
    };

    if (type === 'anime') {
      params.with_genres = 16;
    }

    const response = await axios.get(`${TMDB_BASE_URL}${endpoint}`, { params });
    return response.data.results;
  } catch (error) {
    console.error(`Erro ao buscar ${type} na TMDB:`, error);
    return [];
  }
};
