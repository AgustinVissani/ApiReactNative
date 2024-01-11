const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { db } = require("./firebase");
const { body, validationResult } = require("express-validator");

// Middleware
app.use(bodyParser.json());
app.use(cors());

const booksCollection = db.collection("books");

// Endpoints
app.get("/books", async (req, res) => {
  try {
    const snapshot = await booksCollection.get();
    const books = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Error getting books" });
  }
});

app.get("/books/:id", async (req, res) => {
  const bookId = req.params.id;

  try {
    const doc = await booksCollection.doc(bookId).get();

    if (!doc.exists) {
      res.status(404).json({ error: "Book not found" });
      return;
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: `Error getting book with ID ${bookId}` });
  }
});

app.post(
  "/books",
  [
    body("title").notEmpty(),
    body("author").notEmpty(),
    body("genre").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await booksCollection.add(req.body);
      res.json({ message: "Book save successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error creating book" });
    }
  }
);

app.put("/books/:id", async (req, res) => {
  const bookId = req.params.id;
  const updatedData = req.body;

  try {
    await booksCollection.doc(bookId).update(updatedData);    
    res.json({ message: "Book update successfully" });
  } catch (error) {
    res.status(500).json({ error: `Error updating book with ID ${bookId}` });
  }
});

app.delete("/books/:id", async (req, res) => {
  const bookId = req.params.id;

  try {
    await booksCollection.doc(bookId).delete();
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: `Error deleting book with ID ${bookId}` });
  }
});

module.exports = app;
