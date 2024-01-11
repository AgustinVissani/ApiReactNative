import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { useBooks } from './BooksContext';
import CreateForms from "./CreateForms";

const CreateBook = () => {
  const { addBook } = useBooks();

  const handleSave = async (data) => {
    addBook(data);
  };

  return (
    <ScrollView style={styles.container}>
      <CreateForms
        initialValues={{
          title: "",
          author: "",
          genre: "",
          year: "",
          synopsis: "",
          pages: ""
        }}
        onSave={handleSave}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 35,
    paddingHorizontal: 20, 
    paddingTop: 10, 
  },
});

export default CreateBook;
