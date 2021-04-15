const Joi = require('joi');
const errorHandler = require('../../utils/error-handler');

const postBook = {
  payload: Joi.object({
    name: Joi.string()
      .required()
      .error(new Error('Gagal menambahkan buku. Mohon isi nama buku')),
    year: Joi.number().integer().required(),
    author: Joi.string().required(),
    summary: Joi.string().required(),
    publisher: Joi.string().required(),
    pageCount: Joi.number().integer().required(),
    readPage: Joi.number()
      .integer()
      .max(Joi.ref('pageCount'))
      .required()
      .error(
        new Error(
          'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        )
      ),
    reading: Joi.boolean().required(),
  }).unknown(false),
  failAction: async function FailAction(_, __, err) {
    const { message } = err.output.payload;
    throw errorHandler(message, 400);
  },
};

const updateBook = {
  payload: Joi.object({
    name: Joi.string()
      .required()
      .error(new Error('Gagal memperbarui buku. Mohon isi nama buku')),
    year: Joi.number().integer(),
    author: Joi.string(),
    summary: Joi.string(),
    publisher: Joi.string(),
    pageCount: Joi.number().integer(),
    readPage: Joi.number()
      .integer()
      .max(Joi.ref('pageCount'))
      .required()
      .error(
        new Error(
          'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        )
      ),
    reading: Joi.boolean(),
  }).unknown(false),
  failAction: async function FailAction(_, __, err) {
    const { message } = err.output.payload;
    throw errorHandler(message, 400);
  },
};

module.exports = { postBook, updateBook };
