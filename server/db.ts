import { PrismaClient } from '@prisma/client'

const url = process.env.MONGO_URL ?? process.env.MONGO_URI ?? process.env.DATABASE_URL

export const prisma = new PrismaClient(
    url ? { datasources: { db: { url } } } : undefined,
)

