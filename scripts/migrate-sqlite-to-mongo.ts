import { readFileSync } from 'node:fs';
import { ObjectId } from 'mongodb';
import { PrismaClient } from '@prisma/client';

type Row = Record<string, unknown>;

const dumpPath = process.argv[2] ?? '/tmp/portfolio-sqlite-export.json';
const dump = JSON.parse(readFileSync(dumpPath, 'utf8')) as Record<string, Row[]>;

const prisma = new PrismaClient();
const ids = new Map<string, string>();

function oidFor(oldId: string | null | undefined) {
  if (!oldId) return undefined;
  const existing = ids.get(oldId);
  if (existing) return existing;
  const next = new ObjectId().toHexString();
  ids.set(oldId, next);
  return next;
}

function asDate(value: unknown) {
  if (value == null || value === '') return undefined;
  if (typeof value === 'number') return new Date(value);
  const n = Number(value);
  if (!Number.isNaN(n) && String(value).length >= 12) return new Date(n);
  return new Date(String(value));
}

function asBool(value: unknown) {
  return value === true || value === 1 || value === '1';
}

async function main() {
  const users = dump.User ?? [];
  const accounts = dump.Account ?? [];
  const sessions = dump.Session ?? [];
  const projects = dump.Project ?? [];
  const experiences = dump.Experience ?? [];
  const categories = dump.SkillCategory ?? [];
  const skills = dump.Skill ?? [];
  const blogs = dump.Blog ?? [];
  const comments = dump.Comment ?? [];

  for (const row of users) {
    const id = oidFor(String(row.id))!;
    await prisma.user.upsert({
      where: { email: String(row.email) },
      update: {
        name: String(row.name),
        role: String(row.role ?? 'user'),
        emailVerified: asBool(row.emailVerified),
        image: row.image ? String(row.image) : null,
      },
      create: {
        id,
        name: String(row.name),
        email: String(row.email),
        emailVerified: asBool(row.emailVerified),
        image: row.image ? String(row.image) : null,
        role: String(row.role ?? 'user'),
        createdAt: asDate(row.createdAt),
        updatedAt: asDate(row.updatedAt),
      },
    });
    const saved = await prisma.user.findUnique({ where: { email: String(row.email) } });
    if (saved) ids.set(String(row.id), saved.id);
  }

  for (const row of accounts) {
    const userId = oidFor(String(row.userId));
    if (!userId) continue;
    const existing = await prisma.account.findFirst({
      where: { userId, providerId: String(row.providerId) },
    });
    const data = {
      accountId: ids.get(String(row.accountId)) ?? String(row.accountId),
      providerId: String(row.providerId),
      userId,
      password: row.password ? String(row.password) : null,
      accessToken: row.accessToken ? String(row.accessToken) : null,
      refreshToken: row.refreshToken ? String(row.refreshToken) : null,
      idToken: row.idToken ? String(row.idToken) : null,
      scope: row.scope ? String(row.scope) : null,
      createdAt: asDate(row.createdAt),
      updatedAt: asDate(row.updatedAt),
    };
    if (existing) {
      await prisma.account.update({ where: { id: existing.id }, data });
    } else {
      await prisma.account.create({ data: { id: oidFor(String(row.id)), ...data } });
    }
  }

  for (const row of sessions) {
    const userId = oidFor(String(row.userId));
    if (!userId || !row.token) continue;
    await prisma.session.upsert({
      where: { token: String(row.token) },
      update: {
        expiresAt: asDate(row.expiresAt) ?? new Date(Date.now() + 7 * 86400000),
        userId,
        ipAddress: row.ipAddress ? String(row.ipAddress) : null,
        userAgent: row.userAgent ? String(row.userAgent) : null,
      },
      create: {
        id: oidFor(String(row.id)),
        token: String(row.token),
        expiresAt: asDate(row.expiresAt) ?? new Date(Date.now() + 7 * 86400000),
        userId,
        ipAddress: row.ipAddress ? String(row.ipAddress) : null,
        userAgent: row.userAgent ? String(row.userAgent) : null,
        createdAt: asDate(row.createdAt),
        updatedAt: asDate(row.updatedAt),
      },
    });
  }

  for (const row of projects) {
    const userId = oidFor(String(row.userId));
    if (!userId) continue;
    const existing = await prisma.project.findFirst({
      where: { userId, title: String(row.title), link: String(row.link) },
    });
    const data = {
      title: String(row.title),
      link: String(row.link),
      description: String(row.description),
      imageUrl: String(row.imageUrl),
      userId,
      createdAt: asDate(row.createdAt),
    };
    if (existing) {
      await prisma.project.update({ where: { id: existing.id }, data });
      ids.set(String(row.id), existing.id);
    } else {
      const created = await prisma.project.create({ data: { id: oidFor(String(row.id)), ...data } });
      ids.set(String(row.id), created.id);
    }
  }

  for (const row of experiences) {
    const userId = oidFor(String(row.userId));
    if (!userId) continue;
    const existing = await prisma.experience.findFirst({
      where: { userId, company: String(row.company), title: String(row.title) },
    });
    const data = {
      company: String(row.company),
      title: String(row.title),
      description: String(row.description),
      startDate: asDate(row.startDate) ?? new Date(),
      endDate: asDate(row.endDate) ?? null,
      link: row.link ? String(row.link) : null,
      userId,
    };
    if (existing) {
      await prisma.experience.update({ where: { id: existing.id }, data });
    } else {
      await prisma.experience.create({ data: { id: oidFor(String(row.id)), ...data } });
    }
  }

  for (const row of categories) {
    const existing = await prisma.skillCategory.findUnique({ where: { name: String(row.name) } });
    if (existing) {
      ids.set(String(row.id), existing.id);
      continue;
    }
    const created = await prisma.skillCategory.create({
      data: { id: oidFor(String(row.id)), name: String(row.name) },
    });
    ids.set(String(row.id), created.id);
  }

  for (const row of skills) {
    const categoryId = oidFor(String(row.categoryId));
    if (!categoryId) continue;
    const existing = await prisma.skill.findFirst({
      where: { categoryId, name: String(row.name) },
    });
    if (existing) continue;
    await prisma.skill.create({
      data: {
        id: oidFor(String(row.id)),
        name: String(row.name),
        categoryId,
      },
    });
  }

  for (const row of blogs) {
    const userId = oidFor(String(row.userId));
    if (!userId) continue;
    const existing = await prisma.blog.findFirst({
      where: { userId, title: String(row.title) },
    });
    const data = {
      title: String(row.title),
      content: String(row.content),
      imageUrl: String(row.imageUrl),
      userId,
      createdAt: asDate(row.createdAt),
    };
    if (existing) {
      await prisma.blog.update({ where: { id: existing.id }, data });
      ids.set(String(row.id), existing.id);
    } else {
      const created = await prisma.blog.create({ data: { id: oidFor(String(row.id)), ...data } });
      ids.set(String(row.id), created.id);
    }
  }

  for (const row of comments) {
    const userId = oidFor(String(row.userId));
    if (!userId) continue;
    await prisma.comment.create({
      data: {
        id: oidFor(String(row.id)),
        content: String(row.content),
        userId,
        projectId: row.projectId ? oidFor(String(row.projectId)) : null,
        blogId: row.blogId ? oidFor(String(row.blogId)) : null,
        createdAt: asDate(row.createdAt),
      },
    });
  }

  console.log(JSON.stringify({
    users: await prisma.user.count(),
    accounts: await prisma.account.count(),
    sessions: await prisma.session.count(),
    projects: await prisma.project.count(),
    experiences: await prisma.experience.count(),
    skillCategories: await prisma.skillCategory.count(),
    skills: await prisma.skill.count(),
    blogs: await prisma.blog.count(),
    comments: await prisma.comment.count(),
  }, null, 2));
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
