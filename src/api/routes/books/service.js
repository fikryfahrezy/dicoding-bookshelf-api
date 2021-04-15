const { nanoid } = require('nanoid');
const errorHandler = require('../../utils/error-handler');
const {
  insertBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} = require('./repository');

const newBook = function newBook({
  name,
  year,
  author,
  summary,
  publisher,
  pageCount,
  readPage,
  reading,
}) {
  const id = nanoid();
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  return {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
};

const addBook = function addBook(data) {
  const bookData = newBook(data);
  const { id } = bookData;

  insertBook(bookData);

  const isSuccess = getBooks().findIndex((book) => book.id === id) >= 0;

  if (!isSuccess) {
    throw errorHandler('Gagal menambahkan buku.');
  }

  return id;
};

const getAllBooks = function getAllBooks({
  name = null,
  reading = null,
  finished = null,
} = {}) {
  const query = { name, reading, finished };
  return getBooks(query);
};

const getBookById = function getBookById(bookId) {
  const book = getBook(bookId);

  if (!book) {
    throw errorHandler('Buku tidak ditemukan', 404);
  }

  return book;
};

const updateBookById = function updateBookById(bookId, newBookData) {
  const book = getBook(bookId);

  if (!book) {
    throw errorHandler('Gagal memperbarui buku. Id tidak ditemukan', 404);
  }

  updateBook(book.id, newBookData);
};

const deleteBookById = function deleteBookById(bookId) {
  const book = getBook(bookId);

  if (!book) {
    throw errorHandler('Buku gagal dihapus. Id tidak ditemukan', 404);
  }

  deleteBook(book.id);
};

module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
};
