import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const CreateForms = ({ initialValues, onSave }) => {
  const navigation = useNavigation();
  const [state, setState] = useState(initialValues);
  const [errors, setErrors] = useState({
    title: "",
    author: "",
    genre: "",
    year: 0,
    pages: 0,
  });

  const handleChangeText = (name, value) => {
    if ((name === "year" || name === "pages") && !/^[1-9]\d*$/.test(value)) {
      return;
    }
    setState({ ...state, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSave = async () => {
    const requiredFields = ["title", "author", "genre"];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!state[field]) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    });

    if (state.year && !/^[1-9]\d*$/.test(state.year)) {
      newErrors.year = "Year must be a number";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      await onSave(state);
      navigation.navigate("List Books");
    } catch (error) {
      console.error("Error saving book", error);
    }
  };

  return (
    <View>
      {Object.keys(state).map((field) => (
        <View key={field} style={styles.inputGroup}>
          <TextInput
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={state[field]}
            onChangeText={(value) => handleChangeText(field, value)}
            style={[styles.input, errors[field] ? styles.inputError : null]}
            placeholderTextColor="#cccccc"
            keyboardType={
              field === "year" || field === "pages" ? "numeric" : "default"
            }
          />
          {errors[field] ? (
            <Text style={styles.errorText}>{errors[field]}</Text>
          ) : null}
        </View>
      ))}
      <View>
        <Button title="Save" onPress={handleSave} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
    fontSize: 16,
    borderColor: "#cccccc",
    borderWidth: 1,
    paddingVertical: 8,
  },
  inputError: {
    borderBottomColor: "red",
    borderBottomWidth: 1,
    fontSize: 16,
    borderColor: "gray",
    borderWidth: 2,
    paddingVertical: 8,
  },
  errorText: {
    color: "rgba(255, 0, 0, 0.7)",
    fontSize: 14,
    marginTop: 5,
  }
});

export default CreateForms;
