import axios from 'axios';
import { API_KEY, TMDB_BASE_URL } from './apiConfig';

export const getDetails = async (id, type = 'movie') => {
  try {
    let response;

    if (type === 'movie') {
      response = await axios.get(`${TMDB_BASE_URL}movie/${id}`, {
        params: { api_key: API_KEY, language: 'pt-BR' },
      });
    } else if (type === 'tv' || type === 'anime') {
      response = await axios.get(`${TMDB_BASE_URL}tv/${id}`, {
        params: { api_key: API_KEY, language: 'pt-BR' },
      });
    }

    const details = response.data;
    if (!details) return null;

    // Busca o elenco e a equipe de produção (diretores incluídos aqui)
    const creditsResponse = await axios.get(`${TMDB_BASE_URL}${type}/${id}/credits`, {
      params: { api_key: API_KEY },
    });

    const cast = creditsResponse.data.cast;
    const crew = creditsResponse.data.crew;

    
    // Filtra a equipe para incluir somente os diretores
    const directors = crew.filter((member) => member.job === 'Director');
    console.log('Directors:', directors);


    // Busca os trailers (vídeos)
    const videosResponse = await axios.get(`${TMDB_BASE_URL}${type}/${id}/videos`, {
      params: { api_key: API_KEY, language: 'pt-BR' },
    });

    const videos = videosResponse.data.results;

    // Filtra para incluir somente trailers e vídeos relevantes
    const validVideos = videos.filter((video) => video.type === 'Trailer' || video.type === 'Opening Credits');

    // Retorna os detalhes do filme/série com os diretores
    return {
      title: details.name || details.title || 'Título não disponível',
      overview: details.overview || 'Sinopse não disponível',
      rating: details.vote_average || 'N/A',
      cast: cast || [],
      directors: directors.length ? directors : [], // Garante que será sempre um array
      trailers: validVideos || [],
      releaseDate: details.first_air_date || details.release_date || 'Data de lançamento não disponível',
    };
    
  } catch (error) {
    console.error('Erro ao buscar detalhes:', error.response ? error.response.data : error.message);
    return null;
  }
};
