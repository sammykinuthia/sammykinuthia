import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { prisma } from '../db';
import { createProjectSchema, updateProjectSchema } from '../schemas';
import { Prisma } from '@prisma/client';
import { guard } from '../middleware';
import type { AppEnv } from '../env';

export const projects = new Hono<AppEnv>()
    .get('/', async (c) => {
        try {
            const items = await prisma.project.findMany({
                orderBy: { createdAt: 'desc' },
            });
            return c.json(items);
        } catch {
            return c.json({ error: 'Failed to fetch projects' }, 500);
        }
    })
    .get('/:id', async (c) => {
        const { id } = c.req.param();
        try {
            const project = await prisma.project.findUnique({ where: { id } });
            if (!project) {
                return c.json({ error: 'Project not found' }, 404);
            }
            return c.json(project);
        } catch {
            return c.json({ error: 'Failed to fetch project' }, 500);
        }
    })
    .post('/', guard({ role: 'admin' }), zValidator('json', createProjectSchema), async (c) => {
        const user = c.get('user');
        const projectData = c.req.valid('json');
        if (!user) {
            return c.json({ error: 'Unauthorized' }, 401);
        }

        try {
            const newProject = await prisma.project.create({
                data: { ...projectData, userId: user.id },
            });
            return c.json(newProject, 201);
        } catch {
            return c.json({ error: 'Failed to create project' }, 500);
        }
    })
    .patch('/:id', guard({ role: 'admin' }), zValidator('json', updateProjectSchema), async (c) => {
        const { id } = c.req.param();
        const projectData = c.req.valid('json');

        try {
            const updatedProject = await prisma.project.update({
                where: { id },
                data: projectData,
            });
            return c.json(updatedProject);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                return c.json({ error: 'Project not found' }, 404);
            }
            return c.json({ error: 'Failed to update project' }, 500);
        }
    })
    .delete('/:id', guard({ role: 'admin' }), async (c) => {
        const { id } = c.req.param();
        try {
            await prisma.project.delete({ where: { id } });
            return c.json({ message: 'Project deleted successfully' });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                return c.json({ error: 'Project not found' }, 404);
            }
            return c.json({ error: 'Failed to delete project' }, 500);
        }
    });
