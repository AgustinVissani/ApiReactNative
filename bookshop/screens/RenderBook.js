import React from "react";
import { ListItem } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, StyleSheet, Alert } from "react-native";

import { useBooks } from './BooksContext';

const RenderBook = ({ book }) => {
  const navigation = useNavigation();
  const { deleteBook } = useBooks();

  const handleEdit = (book) => {
    navigation.navigate("Edit Book", { book });
  };

  const handleDelete = () =>
    Alert.alert('Delete Book', 'Are you sure you want to delete this book?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Delete',  onPress: () => deleteBook(book.id)},
    ]);

  return (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{book.title}</ListItem.Title>
        <ListItem.Subtitle>{book.author}</ListItem.Subtitle>
        <ListItem.Subtitle>{book.genre}</ListItem.Subtitle>
      </ListItem.Content>

      <Pressable
        style={styles.editButton}
        onPress={() => handleEdit(book)}
      >
        <Text style={styles.buttonText}>EDIT</Text>
      </Pressable>

      <Pressable
        style={styles.deleteButton}
        onPress={() =>handleDelete(book.id)}
      >
        <Text style={styles.buttonText}>DELETE</Text>
      </Pressable>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  editButton: {
    backgroundColor: "rgba(0, 128, 0, 0.7)",
    padding: 10,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    padding: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});


export default RenderBook;
