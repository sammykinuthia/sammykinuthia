import { createMiddleware } from 'hono/factory';
import type { AppEnv } from './env';

export const guard = (options?: { role?: 'admin' }) => {
    return createMiddleware<AppEnv>(async (c, next) => {
        const user = c.get('user');

        if (!user) {
            return c.json({ error: 'Unauthorized: You must be logged in to access this resource.' }, 401);
        }

        if (options?.role && user.role !== options.role) {
            return c.json({ error: 'Forbidden: You do not have the necessary permissions.' }, 403);
        }

        await next();
    });
};
