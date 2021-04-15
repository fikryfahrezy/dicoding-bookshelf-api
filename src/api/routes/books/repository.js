const books = require('../../../db');

const insertBook = function insertBook(data) {
  books.push(data);
};

const getBooks = function getBooks({
  name: queryName,
  reading,
  finished,
} = {}) {
  return books
    .filter((book) => {
      let isValid = true;

      if (queryName) {
        isValid =
          isValid && book.name.toLowerCase().includes(queryName.toLowerCase());
      }

      if (reading) {
        isValid = isValid && book.reading === Boolean(Number(reading));
      }

      if (finished) {
        isValid = isValid && book.finished === Boolean(Number(finished));
      }

      return isValid;
    })
    .map(({ id, name, publisher }) => ({ id, name, publisher }));
};

const getBook = function getBook(bookId) {
  return books.find((book) => book.id === bookId);
};

const updateBook = function updateBook(bookId, newBookData) {
  const bookIndex = books.findIndex((book) => book.id === bookId);

  books[bookIndex] = {
    ...books[bookIndex],
    ...newBookData,
    updatedAt: new Date().toISOString(),
  };
};

const deleteBook = function deleteBook(bookId) {
  const bookIndex = getBooks().findIndex((book) => book.id === bookId);

  books.splice(bookIndex, 1);
};

module.exports = { insertBook, getBooks, getBook, updateBook, deleteBook };
