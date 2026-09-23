async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    credentials: 'include',
    signal: AbortSignal.timeout(8000),
    ...init,
    headers: {
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers,
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || `Request failed (${res.status})`);
  }
  return data as T;
}

export const api = {
  me: () => request<{ id: string; email: string; name: string; role: string; image: string | null }>('/me'),
  health: () => request<{ ok: boolean }>('/health'),
  projects: {
    list: () => request<Project[]>('/projects'),
    get: (id: string) => request<Project>(`/projects/${id}`),
    create: (body: ProjectInput) => request<Project>('/projects', { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: Partial<ProjectInput>) => request<Project>(`/projects/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    remove: (id: string) => request<{ message: string }>(`/projects/${id}`, { method: 'DELETE' }),
  },
  experiences: {
    list: () => request<Experience[]>('/experiences'),
    create: (body: ExperienceInput) => request<Experience>('/experiences', { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: Partial<ExperienceInput>) => request<Experience>(`/experiences/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    remove: (id: string) => request<{ message: string }>(`/experiences/${id}`, { method: 'DELETE' }),
  },
  skills: {
    list: () => request<SkillCategory[]>('/skills'),
    createCategory: (name: string) => request<SkillCategory>('/skills/categories', { method: 'POST', body: JSON.stringify({ name }) }),
    removeCategory: (id: string) => request<{ message: string }>(`/skills/categories/${id}`, { method: 'DELETE' }),
    create: (body: { name: string; categoryId: string }) => request<Skill>('/skills', { method: 'POST', body: JSON.stringify(body) }),
    remove: (id: string) => request<{ message: string }>(`/skills/${id}`, { method: 'DELETE' }),
  },
  blogs: {
    list: () => request<Blog[]>('/blogs'),
    get: (id: string) => request<Blog>(`/blogs/${id}`),
    create: (body: BlogInput) => request<Blog>('/blogs', { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: Partial<BlogInput>) => request<Blog>(`/blogs/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    remove: (id: string) => request<{ message: string }>(`/blogs/${id}`, { method: 'DELETE' }),
  },
};

export type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  createdAt?: string;
};

export type ProjectInput = Omit<Project, 'id' | 'createdAt'>;

export type Experience = {
  id: string;
  company: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string | null;
  link?: string | null;
};

export type ExperienceInput = {
  company: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string | null;
  link?: string | null;
};

export type Skill = { id: string; name: string; categoryId?: string };

export type SkillCategory = {
  id: string;
  name: string;
  skills: Skill[];
};

export type Blog = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt?: string;
};

export type BlogInput = Omit<Blog, 'id' | 'createdAt'>;
