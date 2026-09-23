import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './db';
import { royoltechMailer } from './mailer';

const CLIENT_ORIGIN = process.env.APP_ORIGIN
    ?? (process.env.NODE_ENV === 'production'
        ? 'https://sammykinuthia.vercel.app'
        : 'http://localhost:5173');

const mailer = process.env.ROYOLTECH_MAIL_API_KEY
    ? royoltechMailer({
        apiKey: process.env.ROYOLTECH_MAIL_API_KEY,
        adminEmail: process.env.ROYOLTECH_MAIL_ADMIN_EMAIL ?? 'kinuthiasamuel05@gmail.com',
        fromName: 'Samuel Mwaniki',
    })
    : null;

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: 'mongodb',
    }),
    trustedOrigins: [CLIENT_ORIGIN],
    baseURL: process.env.BETTER_AUTH_URL ?? CLIENT_ORIGIN,
    secret: process.env.BETTER_AUTH_SECRET ?? process.env.AUTH_SECRET ?? 'dev-only-secret-change-me-before-production',
    advanced: {
        database: {
            generateId: false,
        },
        defaultCookieAttributes: {
            sameSite: 'lax',
            path: '/',
            secure: process.env.NODE_ENV === 'production',
        },
    },
    user: {
        additionalFields: {
            role: {
                type: 'string',
                required: false,
                defaultValue: 'user',
                input: false,
            },
        },
    },
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url }) => {
            if (!mailer) {
                console.warn('Password reset requested but mailer is not configured:', url);
                return;
            }
            await mailer.send({
                to: user.email,
                subject: 'Reset your password',
                text: `Hi ${user.name || 'there'},\n\nYou can reset your password here: ${url}\n\nIf you did not request this, you can ignore this email.`,
            });
        },
    },
    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    const count = await prisma.user.count();
                    const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
                    const isAdmin = count === 0 || (adminEmail && user.email.toLowerCase() === adminEmail);
                    return {
                        data: {
                            ...user,
                            role: isAdmin ? 'admin' : 'user',
                        },
                    };
                },
            },
        },
    },
});
