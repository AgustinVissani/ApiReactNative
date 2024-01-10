import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  Button,
  Modal,
  Pressable,
  View,
  StyleSheet,
} from "react-native";

import { useBooks } from "./BooksContext";
import RenderBook from "./RenderBook";
import DetailsBook from "./DetailsBook";

const ListBooks = ({ navigation }) => {
  const { books } = useBooks();
  const [selectedBook, setSelectedBook] = useState(null);

  const keyExtractor = (item) => {
    return item.id;
  };

  const openDetails = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => openDetails(item)}>
      <RenderBook book={item} />
    </Pressable>
  );

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
      {selectedBook && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={true}
          onRequestClose={closeModal}
        >
          <View>
            <DetailsBook
              book={selectedBook}
              closeModal={closeModal}
            />
          </View>
        </Modal>
      )}
      <Button
        title="Create Book"
        onPress={() => navigation.navigate("Create Book")}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});

export default ListBooks;
