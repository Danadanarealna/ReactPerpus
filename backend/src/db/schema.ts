import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const books = sqliteTable('books', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  category: text('category'),
  publisher: text('publisher'),
  isbn: text('isbn'),
  issn: text('issn'),
  author: text('author'),
  year: integer('year'),
  price: real('price'),
  description: text('description'),
});
