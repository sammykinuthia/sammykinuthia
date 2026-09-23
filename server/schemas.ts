import { z } from 'zod';

const href = z.string().min(1, 'A link or path is required');
const imageSrc = z.string().min(1, 'An image URL or path is required');

export const createProjectSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    link: href,
    description: z.string().min(1, 'Description is required'),
    imageUrl: imageSrc,
});

export const updateProjectSchema = createProjectSchema.partial();

export const createBlogSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(10, 'Content must be at least 10 characters long'),
    imageUrl: imageSrc,
});

export const updateBlogSchema = createBlogSchema.partial();

export const createExperienceSchema = z.object({
    company: z.string().min(1, 'Company name is required'),
    title: z.string().min(1, 'Job title is required'),
    description: z.string().min(1, 'Description is required'),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional().nullable(),
    link: href.optional().nullable(),
});

export const updateExperienceSchema = createExperienceSchema.partial();

export const createSkillCategorySchema = z.object({
    name: z.string().min(1, 'Category name is required'),
});

export const createSkillSchema = z.object({
    name: z.string().min(1, 'Skill name is required'),
    categoryId: z.string().min(1, 'Category ID is required'),
});

export const createCommentSchema = z.object({
    content: z.string().min(1, 'Comment content cannot be empty'),
    projectId: z.string().optional(),
    blogId: z.string().optional(),
}).refine((data) => data.projectId || data.blogId, {
    message: 'Either projectId or blogId must be provided',
    path: ['projectId'],
});
