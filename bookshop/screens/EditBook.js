import React from "react";
import {StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

import { useBooks } from './BooksContext';
import CreateForms from "./CreateForms";

const EditBook = () => {
  const { editBook } = useBooks();
  const route = useRoute();
  const { book  } = route.params;

  const handleSave = async (data) => {
    editBook(book.id, data);
  };

  return (
    <ScrollView style={styles.container}>
      <CreateForms
        initialValues={{
          title: book.title,
          author: book.author,
          genre: book.genre,
          year: book.year,
          synopsis: book.synopsis,
          pages: book.pages,
        }}
        onSave={handleSave}
      />      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
    marginBottom: 15,
  },
});

export default EditBook;
