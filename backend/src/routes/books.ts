import { Hono } from 'hono';
import { db } from '../db/client';
import { books } from '../db/schema';
import { eq, like } from 'drizzle-orm';

const bookRoute = new Hono();

bookRoute.get('/', async (c) => {
  const q = c.req.query('search');
  const result = q
    ? await db.select().from(books).where(like(books.name, `%${q}%`))
    : await db.select().from(books);
  return c.json(result);
});

bookRoute.post('/', async (c) => {
  const data = await c.req.json();
  await db.insert(books).values(data);
  return c.json({ success: true });
});

bookRoute.put('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data = await c.req.json();
  await db.update(books).set(data).where(eq(books.id, id));
  return c.json({ success: true });
});

bookRoute.delete('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  await db.delete(books).where(eq(books.id, id));
  return c.json({ success: true });
});

export default bookRoute;
