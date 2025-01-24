import React, { useState, useEffect } from 'react';
import { View, Text, Image, Modal, ScrollView, TouchableOpacity, StyleSheet, Button } from 'react-native';
import YouTubeIframe from 'react-native-youtube-iframe'; // Importação do YouTube player

const MovieModal = ({ selectedMovie, isDarkMode, onClose, language }) => {
  const [isTrailerVisible, setTrailerVisible] = useState(false);
  const [trailerKey, setTrailerKey] = useState(selectedMovie.trailerKey); // Usando o trailerKey diretamente do selectedMovie

  // Exibe trailer quando disponível
  useEffect(() => {
    if (selectedMovie?.trailerKey) {
      setTrailerKey(selectedMovie.trailerKey); // Se o trailerKey mudar, atualiza a chave
    }
  }, [selectedMovie]);

  // Função para renderizar o botão de assistir trailer
  const renderTrailerButton = () => {
    if (!trailerKey) {
      return (
        <Text style={[styles.modalText, { color: isDarkMode ? '#ddd' : '#000' }]}>
          {language === 'pt-BR' ? 'Trailer não disponível' : language === 'en-US' ? 'Trailer not available' : 'Tráiler no disponible'}
        </Text>
      );
    }

    return (
      <TouchableOpacity
        style={styles.trailerButton}
        onPress={() => {
          setTrailerVisible(true); // Exibe o trailer
        }}
      >
        <Text style={[styles.modalText, { color: isDarkMode ? '#fff' : '#000' }]}>
          {language === 'pt-BR' ? 'Assistir Trailer' : language === 'en-US' ? 'Watch Trailer' : 'Ver Tráiler'}
        </Text>
      </TouchableOpacity>
    );
  };

  // Função para renderizar o player do trailer
  const renderTrailerPlayer = () => {
    if (!trailerKey) {
      return (
        <Text style={[styles.modalText, { color: isDarkMode ? '#ddd' : '#000' }]}>
          {language === 'pt-BR' ? 'Trailer não disponível' : language === 'en-US' ? 'Trailer not available' : 'Tráiler no disponible'}
        </Text>
      );
    }

    return (
      <View style={styles.videoContainer}>
        <YouTubeIframe
          videoId={trailerKey} // Usando a chave do trailer
          height={200} // Ajuste do tamanho do player
          play={true} // Reproduz automaticamente
          onChangeState={(state) => console.log(state)} // Função para rastrear mudanças no estado do player
        />
      </View>
    );
  };

  return (
    <Modal visible={true} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#222' : '#fff' }]}>
          <ScrollView contentContainerStyle={styles.modalScrollView}>
            {/* Título do Filme */}
            <Text style={[styles.modalTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
              {selectedMovie.title || selectedMovie.name}
            </Text>

            {/* Imagem do Filme */}
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}` }}
              style={styles.modalPoster}
            />

            {/* Descrição do Filme */}
            <Text style={[styles.modalOverview, { color: isDarkMode ? '#ddd' : '#000' }]}>
              {selectedMovie.overview || 'Descrição não disponível'}
            </Text>

            {/* Direção */}
            <Text style={[styles.modalSubheading, { color: isDarkMode ? '#ddd' : '#000' }]}>Direção:</Text>
            <Text style={[styles.modalText, { color: isDarkMode ? '#ddd' : '#000' }]}>{selectedMovie.director}</Text>

            {/* Elenco */}
            <Text style={[styles.modalSubheading, { color: isDarkMode ? '#ddd' : '#000' }]}>Elenco:</Text>
            <Text style={[styles.modalText, { color: isDarkMode ? '#ddd' : '#000' }]}>
              {selectedMovie.cast.length > 0 ? selectedMovie.cast.join(', ') : 'Não disponível'}
            </Text>

            {/* Nota do IMDb */}
            <Text style={[styles.modalSubheading, { color: isDarkMode ? '#ddd' : '#000' }]}>
              {language === 'pt-BR' ? 'Nota no IMDb:' : language === 'en-US' ? 'IMDb Rating:' : 'Calificación IMDb:'}
            </Text>
            <Text style={[styles.modalText, { color: isDarkMode ? '#ddd' : '#000' }]}>
              {selectedMovie.vote_average || 'N/A'}
            </Text>

            {/* Trailer */}
            <Text style={[styles.modalSubheading, { color: isDarkMode ? '#ddd' : '#000' }]}>
              {language === 'pt-BR' ? 'Trailer:' : language === 'en-US' ? 'Trailer:' : 'Tráiler:'}
            </Text>
            {isTrailerVisible ? renderTrailerPlayer() : renderTrailerButton()}
            
            {/* Botão de Fechar */}
            <Button
              title={language === 'pt-BR' ? 'Fechar' : language === 'en-US' ? 'Close' : 'Cerrar'}
              onPress={onClose}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalScrollView: {
    flexGrow: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalPoster: {
    width: 200,
    height: 300,
    marginBottom: 10,
    borderRadius: 10,
    alignSelf: 'center',  
  },
  modalOverview: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSubheading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  trailerButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15, // Adicionando o espaçamento após o botão
  },
  videoContainer: {
    marginVertical: 10,
    width: '100%',
  },
});

export default MovieModal;
