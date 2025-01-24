import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado inicial padrão
  const [language, setLanguage] = useState('pt-BR');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Carregar configurações do AsyncStorage ao inicializar
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const darkModeSetting = await AsyncStorage.getItem('isDarkMode');
        const languageSetting = await AsyncStorage.getItem('language');
        const notificationsSetting = await AsyncStorage.getItem('notificationsEnabled');

        if (darkModeSetting !== null) setIsDarkMode(JSON.parse(darkModeSetting));
        if (languageSetting !== null) setLanguage(languageSetting);
        if (notificationsSetting !== null) setNotificationsEnabled(JSON.parse(notificationsSetting));
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
      }
    };

    loadSettings();
  }, []);

  // Alternar modo escuro e salvar no AsyncStorage
  const toggleTheme = async () => {
    try {
      const newDarkMode = !isDarkMode;
      setIsDarkMode(newDarkMode);
      await AsyncStorage.setItem('isDarkMode', JSON.stringify(newDarkMode));
    } catch (error) {
      console.error('Erro ao salvar modo escuro:', error);
    }
  };

  // Alterar idioma e salvar no AsyncStorage
  const changeLanguage = async (selectedLanguage) => {
    try {
      setLanguage(selectedLanguage);
      await AsyncStorage.setItem('language', selectedLanguage);
    } catch (error) {
      console.error('Erro ao salvar idioma:', error);
    }
  };

  // Alternar notificações e salvar no AsyncStorage
  const toggleNotifications = async () => {
    try {
      const newNotificationsEnabled = !notificationsEnabled;
      setNotificationsEnabled(newNotificationsEnabled);
      await AsyncStorage.setItem('notificationsEnabled', JSON.stringify(newNotificationsEnabled));
    } catch (error) {
      console.error('Erro ao salvar notificações:', error);
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        isDarkMode,
        language,
        notificationsEnabled,
        toggleTheme,
        changeLanguage,
        toggleNotifications,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
