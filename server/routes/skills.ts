import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { prisma } from '../db';
import { createSkillCategorySchema, createSkillSchema } from '../schemas';
import { Prisma } from '@prisma/client';
import { guard } from '../middleware';
import type { AppEnv } from '../env';

export const skills = new Hono<AppEnv>()
    .get('/', async (c) => {
        try {
            const categories = await prisma.skillCategory.findMany({
                include: { skills: true },
                orderBy: { name: 'asc' },
            });
            return c.json(categories);
        } catch {
            return c.json({ error: 'Failed to fetch skills' }, 500);
        }
    })
    .post('/categories', guard({ role: 'admin' }), zValidator('json', createSkillCategorySchema), async (c) => {
        const { name } = c.req.valid('json');
        try {
            const newCategory = await prisma.skillCategory.create({ data: { name } });
            return c.json(newCategory, 201);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                return c.json({ error: 'A skill category with this name already exists' }, 409);
            }
            return c.json({ error: 'Failed to create skill category' }, 500);
        }
    })
    .delete('/categories/:id', guard({ role: 'admin' }), async (c) => {
        const { id } = c.req.param();
        try {
            await prisma.skillCategory.delete({ where: { id } });
            return c.json({ message: 'Skill category deleted successfully' });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                return c.json({ error: 'Skill category not found' }, 404);
            }
            return c.json({ error: 'Failed to delete skill category' }, 500);
        }
    })
    .post('/', guard({ role: 'admin' }), zValidator('json', createSkillSchema), async (c) => {
        const skillData = c.req.valid('json');
        try {
            const newSkill = await prisma.skill.create({ data: skillData });
            return c.json(newSkill, 201);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
                return c.json({ error: 'The specified skill category does not exist' }, 400);
            }
            return c.json({ error: 'Failed to create skill' }, 500);
        }
    })
    .delete('/:id', guard({ role: 'admin' }), async (c) => {
        const { id } = c.req.param();
        try {
            await prisma.skill.delete({ where: { id } });
            return c.json({ message: 'Skill deleted successfully' });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                return c.json({ error: 'Skill not found' }, 404);
            }
            return c.json({ error: 'Failed to delete skill' }, 500);
        }
    });
