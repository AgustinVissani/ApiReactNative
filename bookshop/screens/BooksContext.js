import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    if (loading) {
      return;
    } 
    try {
      setLoading(true);
      const response = await axios.get("http://192.168.1.68:3000/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = async (newBook) => {
    if (loading) {
      return;
    } 
    try {      
      setLoading(true);
      await axios.post("http://192.168.1.68:3000/books", newBook);
      fetchBooks();
    } catch (error) {
      console.error("Error adding book", error);
    } finally {
      setLoading(false);
    }
  };

  const editBook = async (id, updatedBook) => {
    if (loading) {
      return;
    } 
    try {      
      setLoading(true);
      await axios.put(`http://192.168.1.68:3000/books/${id}`, updatedBook);
      fetchBooks();
    } catch (error) {
      console.error("Error editing book", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id) => {
    if (loading) {
      return;
    } 
    try {
      await axios.delete(`http://192.168.1.68:3000/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book", error);
    }
  };

  return (
    <BooksContext.Provider
      value={{ books, fetchBooks, addBook, editBook, deleteBook }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return context;
};
