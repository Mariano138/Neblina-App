import { sql } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const notesTable = sqliteTable('users_table', {
  id: int().primaryKey({ autoIncrement: true }),
  title: text(),
  content: text(),
  color: text().notNull(),
  createdDate: text()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedDate: text()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
