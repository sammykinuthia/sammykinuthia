import type { User } from '@prisma/client';
import type { auth } from './auth';

export type AppEnv = {
    Variables: {
        user: User | null;
        session: typeof auth.$Infer.Session.session | null;
    };
};

export const CLIENT_ORIGIN = process.env.APP_ORIGIN
    ?? (process.env.NODE_ENV === 'production'
        ? 'https://sammykinuthia.vercel.app'
        : 'http://localhost:5173');
