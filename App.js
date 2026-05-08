import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import { styles } from './src/styles/appStyles';

// Componente Header
function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>🎯</Text>
      <Text style={styles.title}>Componente Picker</Text>
    </View>
  );
}

// Componente Content
function Content({
  name,
  setName,
  language,
  setLanguage,
  message,
  submitted,
  inputBackgroundColor,
  handleConfirm,
  handleClear,
  corDeFoco,
}) {
  const languages = ['Python', 'JavaScript', 'Java', 'C++', 'C#', 'Ruby', 'Go', 'Rust'];

  return (
    <View style={styles.content}>
      <Text style={styles.label}>Escolha Linguagem Favorita</Text>

      {/* Name Input */}
      <TextInput
        style={[styles.input, { backgroundColor: inputBackgroundColor }]}
        placeholder="Digite seu nome"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
        editable={!submitted}
        onFocus={corDeFoco}
        onBlur={corDeFoco}
      />

      {/* Language Picker */}
      <Text style={styles.pickerLabel}>Escolha uma linguagem:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={language}
          onValueChange={(itemValue) => setLanguage(itemValue)}
          enabled={!submitted}
          style={styles.picker}
        >
          {languages.map((lang) => (
            <Picker.Item key={lang} label={lang} value={lang} />
          ))}
        </Picker>
      </View>

      {/* Result Message */}
      {submitted && (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{message}</Text>
        </View>
      )}

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirm}
          disabled={submitted}
        >
          <Text style={styles.buttonText}>
            {submitted ? 'Confirmado' : 'Confirmar'}
          </Text>
        </TouchableOpacity>

        {submitted && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClear}
          >
            <Text style={styles.buttonText}>Limpar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default function App() {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('Python');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [inputBackgroundColor, setInputBackgroundColor] = useState('#fff');

  const handleConfirm = () => {
    if (name.trim() === '') {
      setMessage('Por favor, Digite seu nome deve ser mostrada');
      setSubmitted(true);
    } else {
      setMessage(`Olá ${name}, sua linguagem de programação favorita é ${language}`);
      setSubmitted(true);
    }
  };

  const handleClear = () => {
    setName('');
    setMessage('');
    setSubmitted(false);
    setLanguage('Python');
    setInputBackgroundColor('#fff');
  };

  const corDeFoco = (isFocused) => {
    if (isFocused && isFocused.type === 'focus') {
      setInputBackgroundColor('#FFA500');
    } else {
      setInputBackgroundColor('#fff');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.card}>
          <Header />
          <Content
            name={name}
            setName={setName}
            language={language}
            setLanguage={setLanguage}
            message={message}
            submitted={submitted}
            inputBackgroundColor={inputBackgroundColor}
            handleConfirm={handleConfirm}
            handleClear={handleClear}
            corDeFoco={corDeFoco}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
