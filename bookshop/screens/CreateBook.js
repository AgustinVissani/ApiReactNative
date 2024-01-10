import React, { useState } from "react";
import { View, Button, TextInput, ScrollView, StyleSheet, Text } from "react-native";
import axios from 'axios';

const CreateBook = () => {
  const [state, setState] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
    synopsis: '',
    pages: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
    synopsis: '',
    pages: '',
  });

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Limpiar el mensaje de error al cambiar el texto
  };

  const handleSave = async () => {
    // Validar antes de guardar
    if (!state.title || !state.author || !state.year) {
      setErrors({
        title: !state.title ? 'Title is required' : '',
        author: !state.author ? 'Author is required' : '',
        year: !state.year ? 'Year is required' : '',
        synopsis: '',
        pages: '',
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/books', state);
      console.log(response.data);
    } catch (error) {
      console.error('Error saving book', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Title"
          onChangeText={(value) => handleChangeText('title', value)}
          style={errors.title ? styles.inputError : styles.input}
        />
        {errors.title ? <Text style={styles.errorText}>{errors.title}</Text> : null}
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Author"
          onChangeText={(value) => handleChangeText('author', value)}
          style={errors.author ? styles.inputError : styles.input}
        />
        {errors.author ? <Text style={styles.errorText}>{errors.author}</Text> : null}
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Genre"
          onChangeText={(value) => handleChangeText('genre', value)}
          style={styles.input}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="1900"
          onChangeText={(value) => handleChangeText('year', value)}
          style={errors.year ? styles.inputError : styles.input}
        />
        {errors.year ? <Text style={styles.errorText}>{errors.year}</Text> : null}
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Synopsis"
          onChangeText={(value) => handleChangeText('synopsis', value)}
          style={styles.input}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="0"
          onChangeText={(value) => handleChangeText('pages', value)}
          style={styles.input}
        />
      </View>
      <View>
        <Button title="Save" onPress={handleSave} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
  },
  inputError: {
    borderBottomColor: "red",
    borderBottomWidth: 1,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default CreateBook;
