import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useSettings } from '../context/SettingsContext';

const SettingsScreen = () => {
  const {
    language,
    notificationsEnabled,
    isDarkMode,
    changeLanguage,
    toggleNotifications,
    toggleTheme,
  } = useSettings();

  const handleLanguageChange = (selectedLanguage) => {
    changeLanguage(selectedLanguage);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>Configurações</Text>

      {/* Idioma */}
      <Text style={[styles.label, { color: isDarkMode ? '#fff' : '#000' }]}>Idioma</Text>
      <Picker
        selectedValue={language}
        style={[styles.picker, { color: isDarkMode ? '#fff' : '#000' }]}
        onValueChange={handleLanguageChange}
      >
        <Picker.Item label="Português" value="pt-BR" />
        <Picker.Item label="English" value="en-US" />
        <Picker.Item label="Español" value="es-ES" />
      </Picker>

      {/* Notificações */}
      <Text style={[styles.label, { color: isDarkMode ? '#fff' : '#000' }]}>Notificações</Text>
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, { color: isDarkMode ? '#fff' : '#000' }]}>
          {notificationsEnabled ? 'Ativado' : 'Desativado'}
        </Text>
        <Switch onValueChange={toggleNotifications} value={notificationsEnabled} />
      </View>

      {/* Tema */}
      <Text style={[styles.label, { color: isDarkMode ? '#fff' : '#000' }]}>Modo Escuro</Text>
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, { color: isDarkMode ? '#fff' : '#000' }]}>
          {isDarkMode ? 'Ativado' : 'Desativado'}
        </Text>
        <Switch onValueChange={toggleTheme} value={isDarkMode} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  switchLabel: {
    fontSize: 16,
  },
});

export default SettingsScreen;
