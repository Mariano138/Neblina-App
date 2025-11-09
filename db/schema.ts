import { sql } from 'drizzle-orm';
import { int, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

//Esquema de mis notas en la db
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
  reminderDate: text(),
  pinned: integer({ mode: 'boolean' }).default(false).notNull(),
});
