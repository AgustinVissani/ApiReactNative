import React from "react";
import { Modal, Text, View, Button, StyleSheet, useWindowDimensions, Image, ScrollView } from "react-native";

const DetailsBook = ({ book, closeModal }) => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalContent: {
      backgroundColor: "white",
      padding: 20,
      width: windowWidth * 0.8,
      maxHeight: windowHeight * 0.8,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: windowWidth < 600 ? 16 : 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    text: {
      fontSize: windowWidth < 600 ? 14 : 16,
      marginBottom: 5,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    synopsisContainer: {
      maxHeight: windowHeight * 0.3,
      marginBottom: 10,
    },
    synopsisText: {
      fontSize: windowWidth < 600 ? 14 : 16,
    },
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={{ uri: book.avatar }} style={styles.avatar} />
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.text}>Author: {book.author}</Text>
          <Text style={styles.text}>Genre: {book.genre}</Text>
          <Text style={styles.text}>Year: {book.year}</Text>
          <View style={styles.synopsisContainer}>
            <ScrollView>
              <Text style={styles.synopsisText}>Synopsis: {book.synopsis}</Text>
            </ScrollView>
          </View>
          <Text style={styles.text}>Pages: {book.pages}</Text>
          <Button title="Close" onPress={closeModal} />
        </View>
      </View>
    </Modal>
  );
};

export default DetailsBook;
