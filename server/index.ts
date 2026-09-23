declare const process: { env: { NODE_ENV?: string; [key: string]: string | undefined } };

import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prisma } from './db';
import { auth } from './auth';
import { CLIENT_ORIGIN, type AppEnv } from './env';
import { projects } from './routes/projects';
import { blogs } from './routes/blogs';
import { experiences } from './routes/experiences';
import { skills } from './routes/skills';
import { comments } from './routes/comments';
import { guard } from './middleware';

export const config = {
    runtime: 'nodejs',
};

const api = new Hono<AppEnv>()
    .get('/health', (c) => c.json({ ok: true }))
    .get('/me', guard(), (c) => {
        const user = c.get('user');
        if (!user) return c.json({ error: 'Unauthorized' }, 401);
        return c.json({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.image,
        });
    })
    .route('/projects', projects)
    .route('/blogs', blogs)
    .route('/experiences', experiences)
    .route('/skills', skills)
    .route('/comments', comments);

const app = new Hono<AppEnv>();

app.use('*', logger());
app.use(
    '*',
    cors({
        origin: CLIENT_ORIGIN,
        allowHeaders: ['Content-Type', 'Authorization'],
        allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    }),
);

app.use('/api/*', async (c, next) => {
    if (c.req.path.startsWith('/api/auth')) {
        await next();
        return;
    }

    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session?.user) {
        c.set('user', null);
        c.set('session', null);
        await next();
        return;
    }

    const dbUser = await prisma.user.findUnique({ where: { id: session.user.id } });
    c.set('user', dbUser);
    c.set('session', session.session);
    await next();
});

app.on(['POST', 'GET', 'OPTIONS'], '/api/auth/*', (c) => auth.handler(c.req.raw));
app.route('/api', api);

export default handle(app);
export { app, api };
export type AppType = typeof api;
