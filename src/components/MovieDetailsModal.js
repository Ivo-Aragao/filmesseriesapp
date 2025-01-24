import React, { useState } from 'react';
import { View, Text, Image, Modal, ScrollView, TouchableOpacity, StyleSheet, Button } from 'react-native';
import YouTubeIframe from 'react-native-youtube-iframe'; // Importando o componente do YouTube

const MovieDetailsModal = ({
  movieDetails,
  selectedMovie,
  showCast,
  isDarkMode,
  language,
  closeModal,
  handleTrailerPress,
  setShowCast,
}) => {
  const [isTrailerVisible, setTrailerVisible] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  const renderTrailerButton = (trailers) => {
    const trailerKey = trailers[0]?.key;

    if (!trailerKey) {
      return <Text style={[styles.modalText, { color: isDarkMode ? '#ddd' : '#000' }]}>Trailer não disponível</Text>;
    }

    return (
      <TouchableOpacity style={styles.trailerButton} onPress={() => {
        setTrailerKey(trailerKey);
        setTrailerVisible(true);
      }}>
        <Text style={[styles.modalText, { color: isDarkMode ? '#ddd' : '#fff' }]}>Assistir Trailer</Text>
      </TouchableOpacity>
    );
  };

  const renderTrailerPlayer = () => {
    if (!trailerKey) {
      return <Text style={[styles.modalText, { color: isDarkMode ? '#ddd' : '#000' }]}>Trailer não disponível</Text>;
    }

    return (
      <View style={styles.videoContainer}>
        <YouTubeIframe
          videoId={trailerKey}
          height={200}
          play={true}
          onChangeState={(state) => console.log(state)}
        />
      </View>
    );
  };

  return (
    <Modal visible={true} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#222' : '#fff' }]}>
          <ScrollView contentContainerStyle={styles.modalScrollView}>
            <Text style={[styles.modalTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
              {movieDetails.title || movieDetails.name}
            </Text>

            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}` }}
              style={styles.modalPoster}
            />

            <Text style={[styles.modalOverview, { color: isDarkMode ? '#ddd' : '#000' }]}>
              {movieDetails.overview || 'Descrição não disponível'}
            </Text>

            <Text style={[styles.modalSubheading, { color: isDarkMode ? '#ddd' : '#000' }]}>Data de Lançamento:</Text>
            <Text style={[styles.modalText, { color: isDarkMode ? '#ddd' : '#000' }]}>
              {movieDetails.releaseDate}
            </Text>
            
            {/* Direção */}
            <Text style={[styles.modalSubheading, { color: isDarkMode ? '#ddd' : '#000' }]}>Diretor(es):</Text>
            {movieDetails.directors && movieDetails.directors.length > 0 ? (
              <Text style={[styles.modalText, { color: isDarkMode ? '#ddd' : '#000' }]}>
                {movieDetails.directors.map((director, index) => (
                  <Text key={index}>
                    {director.name}{index < movieDetails.directors.length - 1 ? ', ' : ''}
                  </Text>
                ))}
              </Text>
            ) : (
              <Text style={[styles.modalText, { color: isDarkMode ? '#ddd' : '#000' }]}>N/A</Text>
            )}


           
            {/* Elenco */}
            <Text style={[styles.modalSubheading, { color: isDarkMode ? '#ddd' : '#000' }]}>Elenco:</Text>
            {movieDetails.cast && movieDetails.cast.length > 0 ? (
              <View>
                <Text style={[styles.modalText, { color: isDarkMode ? '#ddd' : '#000' }]}>
                  {showCast
                    ? movieDetails.cast.map((actor, index) => (
                        <Text key={index}>{actor.name}{index < movieDetails.cast.length - 1 ? ', ' : ''}</Text>
                      ))
                    : `${movieDetails.cast.slice(0, 5).map((actor) => actor.name).join(', ')}`}
                </Text>
                <TouchableOpacity onPress={() => setShowCast(!showCast)}>
                  <Text style={[styles.modalText, { color: isDarkMode ? '#007bff' : '#007bff' }]}>
                    {showCast ? 'Ver Menos' : 'Ver Mais'}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={[styles.modalText, { color: isDarkMode ? '#ddd' : '#000' }]}>N/A</Text>
            )}

            {/* Trailer */}
            <Text style={[styles.modalSubheading, { color: isDarkMode ? '#ddd' : '#000' }]}>Trailer:</Text>
            {isTrailerVisible ? renderTrailerPlayer() : renderTrailerButton(movieDetails.trailers)}

            <View style={styles.breakLine} />

            <Button
              title={language === 'pt-BR' ? 'Fechar' : language === 'en-US' ? 'Close' : 'Cerrar'}
              onPress={closeModal}
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
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
  },
  modalScrollView: {
    flexGrow: 1,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalPoster: {
    width: '100%',
    height: 400,
    marginBottom: 20,
  },
  modalOverview: {
    fontSize: 14,
    marginBottom: 10,
  },
  modalSubheading: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 14,
    marginBottom: 10,
  },
  trailerButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  breakLine: {
    height: 15,
  },
  videoContainer: {
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
    height: 200,  // Ajuste o tamanho do vídeo conforme necessário
  },
});

export default MovieDetailsModal;
