import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { prisma } from '../db';
import { createCommentSchema } from '../schemas';
import { guard } from '../middleware';
import type { AppEnv } from '../env';

export const comments = new Hono<AppEnv>()
    .get('/project/:projectId', async (c) => {
        const { projectId } = c.req.param();
        try {
            const items = await prisma.comment.findMany({
                where: { projectId },
                include: { user: { select: { email: true, name: true } } },
                orderBy: { createdAt: 'asc' },
            });
            return c.json(items);
        } catch {
            return c.json({ error: 'Failed to fetch comments' }, 500);
        }
    })
    .get('/blog/:blogId', async (c) => {
        const { blogId } = c.req.param();
        try {
            const items = await prisma.comment.findMany({
                where: { blogId },
                include: { user: { select: { email: true, name: true } } },
                orderBy: { createdAt: 'asc' },
            });
            return c.json(items);
        } catch {
            return c.json({ error: 'Failed to fetch comments' }, 500);
        }
    })
    .post('/', guard(), zValidator('json', createCommentSchema), async (c) => {
        const user = c.get('user');
        if (!user) {
            return c.json({ error: 'Unauthorized' }, 401);
        }
        const commentData = c.req.valid('json');
        try {
            const newComment = await prisma.comment.create({
                data: { ...commentData, userId: user.id },
            });
            return c.json(newComment, 201);
        } catch {
            return c.json({ error: 'Failed to post comment' }, 500);
        }
    })
    .delete('/:id', guard(), async (c) => {
        const user = c.get('user');
        if (!user) {
            return c.json({ error: 'Unauthorized' }, 401);
        }
        const { id } = c.req.param();
        try {
            const comment = await prisma.comment.findUnique({ where: { id } });
            if (!comment) {
                return c.json({ error: 'Comment not found' }, 404);
            }
            if (comment.userId !== user.id && user.role !== 'admin') {
                return c.json({ error: 'You are not authorized to delete this comment' }, 403);
            }
            await prisma.comment.delete({ where: { id } });
            return c.json({ message: 'Comment deleted successfully' });
        } catch {
            return c.json({ error: 'Failed to delete comment' }, 500);
        }
    });
