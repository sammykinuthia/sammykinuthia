import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { prisma } from '../db';
import { createBlogSchema, updateBlogSchema } from '../schemas';
import { Prisma } from '@prisma/client';
import { guard } from '../middleware';
import type { AppEnv } from '../env';

export const blogs = new Hono<AppEnv>()
    .get('/', async (c) => {
        try {
            const items = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } });
            return c.json(items);
        } catch {
            return c.json({ error: 'Failed to fetch blogs' }, 500);
        }
    })
    .get('/:id', async (c) => {
        const { id } = c.req.param();
        try {
            const blog = await prisma.blog.findUnique({ where: { id } });
            if (!blog) return c.json({ error: 'Blog not found' }, 404);
            return c.json(blog);
        } catch {
            return c.json({ error: 'Failed to fetch blog' }, 500);
        }
    })
    .post('/', guard({ role: 'admin' }), zValidator('json', createBlogSchema), async (c) => {
        const user = c.get('user');
        if (!user) {
            return c.json({ error: 'Unauthorized' }, 401);
        }
        const blogData = c.req.valid('json');
        try {
            const newBlog = await prisma.blog.create({ data: { ...blogData, userId: user.id } });
            return c.json(newBlog, 201);
        } catch {
            return c.json({ error: 'Failed to create blog' }, 500);
        }
    })
    .patch('/:id', guard({ role: 'admin' }), zValidator('json', updateBlogSchema), async (c) => {
        const { id } = c.req.param();
        const blogData = c.req.valid('json');
        try {
            const updatedBlog = await prisma.blog.update({ where: { id }, data: blogData });
            return c.json(updatedBlog);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                return c.json({ error: 'Blog not found' }, 404);
            }
            return c.json({ error: 'Failed to update blog' }, 500);
        }
    })
    .delete('/:id', guard({ role: 'admin' }), async (c) => {
        const { id } = c.req.param();
        try {
            await prisma.blog.delete({ where: { id } });
            return c.json({ message: 'Blog deleted successfully' });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                return c.json({ error: 'Blog not found' }, 404);
            }
            return c.json({ error: 'Failed to delete blog' }, 500);
        }
    });
