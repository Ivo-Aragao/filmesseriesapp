import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Atraso para a Splash Screen antes de redirecionar para a tela principal
    const timer = setTimeout(() => {
      // Após o tempo, navegue para a tela principal
      navigation.replace('Home'); // Substitua 'Home' pela tela principal do seu app
    }, 3000); // 3 segundos para a splash screen

    // Limpeza do timer caso o componente seja desmontado
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Container para a imagem e o carregador */}
      <View style={styles.imageContainer}>
        {/* Logo */}
        <Image
          source={require('../assets/logo6.jpg')} // Substitua pelo caminho da sua logo
          style={styles.logo}
        />
        {/* Indicador de carregamento sobre a imagem */}
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      </View>
      {/* Texto "Carregando..." */}
      <Text style={styles.text}>Carregando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Cor de fundo da splash screen
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Define o contexto de posicionamento para os elementos filhos
  },
  logo: {
    width: 400, // Ajuste o tamanho conforme necessário
    height: 760, // Ajuste o tamanho conforme necessário
  },
  loader: {
    position: 'absolute', // Faz o carregador ficar sobreposto à imagem
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginTop: 20, // Espaçamento entre a imagem e o texto
  },
});

export default SplashScreen;
