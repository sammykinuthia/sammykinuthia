import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { prisma } from '../db';
import { createExperienceSchema, updateExperienceSchema } from '../schemas';
import { Prisma } from '@prisma/client';
import { guard } from '../middleware';
import type { AppEnv } from '../env';

export const experiences = new Hono<AppEnv>()
    .get('/', async (c) => {
        try {
            const items = await prisma.experience.findMany({ orderBy: { startDate: 'desc' } });
            return c.json(items);
        } catch {
            return c.json({ error: 'Failed to fetch experiences' }, 500);
        }
    })
    .post('/', guard({ role: 'admin' }), zValidator('json', createExperienceSchema), async (c) => {
        const user = c.get('user');
        if (!user) {
            return c.json({ error: 'Unauthorized' }, 401);
        }
        const expData = c.req.valid('json');
        try {
            const newExperience = await prisma.experience.create({
                data: {
                    company: expData.company,
                    title: expData.title,
                    description: expData.description,
                    startDate: expData.startDate,
                    endDate: expData.endDate ?? null,
                    link: expData.link ?? null,
                    userId: user.id,
                },
            });
            return c.json(newExperience, 201);
        } catch {
            return c.json({ error: 'Failed to create experience' }, 500);
        }
    })
    .patch('/:id', guard({ role: 'admin' }), zValidator('json', updateExperienceSchema), async (c) => {
        const { id } = c.req.param();
        const expData = c.req.valid('json');
        try {
            const updatedExperience = await prisma.experience.update({
                where: { id },
                data: {
                    ...expData,
                    endDate: expData.endDate === undefined ? undefined : expData.endDate,
                    link: expData.link === undefined ? undefined : expData.link,
                },
            });
            return c.json(updatedExperience);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                return c.json({ error: 'Experience not found' }, 404);
            }
            return c.json({ error: 'Failed to update experience' }, 500);
        }
    })
    .delete('/:id', guard({ role: 'admin' }), async (c) => {
        const { id } = c.req.param();
        try {
            await prisma.experience.delete({ where: { id } });
            return c.json({ message: 'Experience deleted successfully' });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                return c.json({ error: 'Experience not found' }, 404);
            }
            return c.json({ error: 'Failed to delete experience' }, 500);
        }
    });
