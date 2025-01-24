// src/services/tmdbApi.js
import axios from 'axios';

const API_KEY = 'SUA CHAVE API';
const BASE_URL = 'https://api.themoviedb.org/3'; // URL base da API do TMDB

export const getDetails = async (id, mediaType, language = 'pt-BR') => {
  try {
    const response = await axios.get(`${BASE_URL}/${mediaType}/${id}`, {
      params: {
        api_key: API_KEY,
        language: language, // Pode ser 'pt-BR', 'en-US', etc. baseado no contexto do usuário
        append_to_response: 'credits,videos', // Inclui informações de elenco e vídeos (trailer)
      },
    });

    const { data } = response;

    // Obter o elenco (caso esteja disponível)
    const cast = data.credits?.cast?.slice(0, 5).map((actor) => actor.name) || [];

    // Obter a direção (caso esteja disponível)
    const director = data.credits?.crew?.find((member) => member.job === 'Director')?.name || 'Não disponível';

    // Obter trailer (caso esteja disponível)
    const trailerKey = data.videos?.results?.[0]?.key || null;

    return {
      ...data,
      cast,
      director,
      trailerKey,
    };
  } catch (error) {
    console.error('Erro ao buscar detalhes do filme:', error);
    return {}; // Retorna um objeto vazio em caso de erro
  }
};
