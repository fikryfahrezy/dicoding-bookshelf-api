const {
  addBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
} = require('./service');

const addBookHandler = function addBookHandler(req, h) {
  const id = addBook(req.payload);

  return h
    .response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    })
    .code(201);
};

const getAllBookHandler = function getAllBookHandler(req, h) {
  const books = getAllBooks(req.query);

  return h
    .response({
      status: 'success',
      data: {
        books,
      },
    })
    .code(200);
};

const getBookByIdHandler = function getBookByIdHandler(req, h) {
  const { bookId } = req.params;
  const book = getBookById(bookId);

  return h
    .response({
      status: 'success',
      data: {
        book,
      },
    })
    .code(200);
};

const updateBookByIdHandler = function updteBookByIdHandler(req, h) {
  const { bookId } = req.params;
  updateBookById(bookId, req.payload);

  return h
    .response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    })
    .code(200);
};

const deleteBookByIdHandler = function deleteBookByIdHandler(req, h) {
  const { bookId } = req.params;
  deleteBookById(bookId);

  return h
    .response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    })
    .code(200);
};

module.exports = {
  addBookHandler,
  getAllBookHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
};
