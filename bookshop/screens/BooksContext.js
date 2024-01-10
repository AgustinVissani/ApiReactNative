import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = async (newBook) => {
    try {
      await axios.post("http://localhost:3000/books", newBook);
      fetchBooks();
    } catch (error) {
      console.error("Error adding book", error);
    }
  };

  const editBook = async (id, updatedBook) => {
    try {
      await axios.put(`http://localhost:3000/books/${id}`, updatedBook);
      fetchBooks();
    } catch (error) {
      console.error("Error editing book", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book", error);
    }
  };

  return (
    <BooksContext.Provider value={{ books, fetchBooks, addBook, editBook, deleteBook }}>
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
