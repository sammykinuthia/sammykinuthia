import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft, LogOut, Pencil, Plus, Trash2 } from 'lucide-react';
import { authClient } from '../lib/auth';
import { useAuth } from '../lib/useAuth';
import {
  api,
  type Blog,
  type Experience,
  type Project,
  type SkillCategory,
} from '../lib/api';

type Tab = 'projects' | 'experience' | 'skills' | 'blogs';

function toDateInput(value?: string | null) {
  if (!value) return '';
  return new Date(value).toISOString().slice(0, 10);
}

function AdminPage() {
  const { isAdmin, isPending, user } = useAuth();
  const [tab, setTab] = useState<Tab>('projects');
  const [error, setError] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const load = async () => {
    setError('');
    try {
      const [p, e, s, b] = await Promise.all([
        api.projects.list(),
        api.experiences.list(),
        api.skills.list(),
        api.blogs.list(),
      ]);
      setProjects(p);
      setExperiences(e);
      setSkills(s);
      setBlogs(b);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    }
  };

  useEffect(() => {
    if (isAdmin) void load();
  }, [isAdmin]);

  if (isPending) {
    return (
      <div className="min-h-screen grid place-items-center">
        <span className="loading loading-ring loading-lg text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center p-6">
        <div className="card bg-base-200 max-w-md">
          <div className="card-body">
            <h1 className="card-title">Admin only</h1>
            <p className="text-gray-400">This account does not have permission to manage the portfolio.</p>
            <Link to="/" className="btn btn-primary mt-4">Back home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-primary/15 bg-base-200/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Studio</p>
            <h1 className="text-2xl font-bold uppercase">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="btn btn-ghost btn-sm">
              <ArrowLeft className="size-4" /> Portfolio
            </Link>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => authClient.signOut({ fetchOptions: { onSuccess: () => { window.location.href = '/'; } } })}
            >
              <LogOut className="size-4" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {error && <div className="alert alert-error mb-6">{error}</div>}

        <div className="tabs tabs-boxed bg-base-200 mb-8 w-fit flex-wrap">
          {([
            ['projects', 'Projects'],
            ['experience', 'Experience'],
            ['skills', 'Skills'],
            ['blogs', 'Writing'],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              className={`tab ${tab === id ? 'tab-active' : ''}`}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'projects' && (
          <ProjectsPanel items={projects} onChange={load} />
        )}
        {tab === 'experience' && (
          <ExperiencePanel items={experiences} onChange={load} />
        )}
        {tab === 'skills' && (
          <SkillsPanel items={skills} onChange={load} />
        )}
        {tab === 'blogs' && (
          <BlogsPanel items={blogs} onChange={load} />
        )}
      </main>
    </div>
  );
}

function ProjectsPanel({ items, onChange }: { items: Project[]; onChange: () => Promise<void> }) {
  const empty = { title: '', description: '', link: '', imageUrl: '' };
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      if (editingId) await api.projects.update(editingId, form);
      else await api.projects.create(form);
      setForm(empty);
      setEditingId(null);
      await onChange();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8">
      <form className="card bg-base-200 border border-primary/10" onSubmit={submit}>
        <div className="card-body">
          <h2 className="card-title">{editingId ? 'Edit project' : 'Add project'}</h2>
          {message && <div className="alert alert-error text-sm">{message}</div>}
          <input className="input input-bordered" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <textarea className="textarea textarea-bordered" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          <input className="input input-bordered" placeholder="Live URL" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} required />
          <input className="input input-bordered" placeholder="Image URL or /image.png" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} required />
          <div className="card-actions justify-end">
            {editingId && (
              <button type="button" className="btn btn-ghost" onClick={() => { setEditingId(null); setForm(empty); }}>
                Cancel
              </button>
            )}
            <button className="btn btn-primary" disabled={busy}>
              {busy ? 'Saving...' : editingId ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </form>
      <div className="space-y-3">
        {items.length === 0 && <p className="text-gray-400">No projects in the database yet. Add one to replace the public fallback list.</p>}
        {items.map((item) => (
          <article key={item.id} className="p-4 rounded-xl bg-base-200 flex gap-4 items-center">
            <img src={item.imageUrl} alt="" className="w-16 h-16 object-cover rounded-lg" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{item.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-2">{item.description}</p>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => { setEditingId(item.id); setForm({ title: item.title, description: item.description, link: item.link, imageUrl: item.imageUrl }); }}>
              <Pencil className="size-4" />
            </button>
            <button className="btn btn-ghost btn-sm text-error" onClick={async () => { if (confirm('Delete this project?')) { await api.projects.remove(item.id); await onChange(); } }}>
              <Trash2 className="size-4" />
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

function ExperiencePanel({ items, onChange }: { items: Experience[]; onChange: () => Promise<void> }) {
  const empty = { company: '', title: '', description: '', startDate: '', endDate: '', link: '', current: false };
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      const payload = {
        company: form.company,
        title: form.title,
        description: form.description,
        startDate: form.startDate,
        endDate: form.current || !form.endDate ? null : form.endDate,
        link: form.link || null,
      };
      if (editingId) await api.experiences.update(editingId, payload);
      else await api.experiences.create(payload);
      setForm(empty);
      setEditingId(null);
      await onChange();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8">
      <form className="card bg-base-200 border border-primary/10" onSubmit={submit}>
        <div className="card-body">
          <h2 className="card-title">{editingId ? 'Edit experience' : 'Add experience'}</h2>
          {message && <div className="alert alert-error text-sm">{message}</div>}
          <input className="input input-bordered" placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required />
          <input className="input input-bordered" placeholder="Role" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <textarea className="textarea textarea-bordered" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          <input className="input input-bordered" placeholder="Company URL (optional)" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
          <label className="form-control">
            <span className="label-text mb-1">Start date</span>
            <input type="date" className="input input-bordered" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} required />
          </label>
          <label className="label cursor-pointer justify-start gap-3">
            <input type="checkbox" className="checkbox checkbox-primary" checked={form.current} onChange={(e) => setForm({ ...form, current: e.target.checked, endDate: e.target.checked ? '' : form.endDate })} />
            <span>Currently here</span>
          </label>
          {!form.current && (
            <label className="form-control">
              <span className="label-text mb-1">End date</span>
              <input type="date" className="input input-bordered" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
            </label>
          )}
          <div className="card-actions justify-end">
            {editingId && <button type="button" className="btn btn-ghost" onClick={() => { setEditingId(null); setForm(empty); }}>Cancel</button>}
            <button className="btn btn-primary" disabled={busy}>{busy ? 'Saving...' : editingId ? 'Update' : 'Create'}</button>
          </div>
        </div>
      </form>
      <div className="space-y-3">
        {items.length === 0 && <p className="text-gray-400">No experience entries yet.</p>}
        {items.map((item) => (
          <article key={item.id} className="p-4 rounded-xl bg-base-200 flex gap-4 items-start">
            <div className="flex-1">
              <h3 className="font-semibold">{item.company} — {item.title}</h3>
              <p className="text-sm text-gray-400">{item.description}</p>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => {
              setEditingId(item.id);
              setForm({
                company: item.company,
                title: item.title,
                description: item.description,
                startDate: toDateInput(item.startDate),
                endDate: toDateInput(item.endDate),
                link: item.link ?? '',
                current: !item.endDate,
              });
            }}>
              <Pencil className="size-4" />
            </button>
            <button className="btn btn-ghost btn-sm text-error" onClick={async () => { if (confirm('Delete this experience?')) { await api.experiences.remove(item.id); await onChange(); } }}>
              <Trash2 className="size-4" />
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

function SkillsPanel({ items, onChange }: { items: SkillCategory[]; onChange: () => Promise<void> }) {
  const [categoryName, setCategoryName] = useState('');
  const [skillName, setSkillName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [message, setMessage] = useState('');
  const selected = useMemo(() => items.find((c) => c.id === categoryId) ?? items[0], [items, categoryId]);

  useEffect(() => {
    if (!categoryId && items[0]) setCategoryId(items[0].id);
  }, [items, categoryId]);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="card bg-base-200 border border-primary/10">
        <div className="card-body gap-6">
          <div>
            <h2 className="card-title mb-3">New category</h2>
            <form className="flex gap-2" onSubmit={async (e) => {
              e.preventDefault();
              setMessage('');
              try {
                await api.skills.createCategory(categoryName);
                setCategoryName('');
                await onChange();
              } catch (err) {
                setMessage(err instanceof Error ? err.message : 'Failed to add category');
              }
            }}>
              <input className="input input-bordered flex-1" placeholder="e.g. Quality Assurance" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required />
              <button className="btn btn-primary"><Plus className="size-4" /></button>
            </form>
          </div>
          <div>
            <h2 className="card-title mb-3">New skill</h2>
            <form className="space-y-2" onSubmit={async (e) => {
              e.preventDefault();
              if (!selected) return;
              setMessage('');
              try {
                await api.skills.create({ name: skillName, categoryId: selected.id });
                setSkillName('');
                await onChange();
              } catch (err) {
                setMessage(err instanceof Error ? err.message : 'Failed to add skill');
              }
            }}>
              <select className="select select-bordered w-full" value={selected?.id ?? ''} onChange={(e) => setCategoryId(e.target.value)}>
                {items.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
              <div className="flex gap-2">
                <input className="input input-bordered flex-1" placeholder="Skill name" value={skillName} onChange={(e) => setSkillName(e.target.value)} required />
                <button className="btn btn-primary" disabled={!selected}><Plus className="size-4" /></button>
              </div>
            </form>
          </div>
          {message && <div className="alert alert-error text-sm">{message}</div>}
        </div>
      </div>
      <div className="space-y-4">
        {items.length === 0 && <p className="text-gray-400">No skill categories yet.</p>}
        {items.map((category) => (
          <article key={category.id} className="p-4 rounded-xl bg-base-200">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold">{category.name}</h3>
              <button className="btn btn-ghost btn-xs text-error" onClick={async () => { if (confirm(`Delete ${category.name}?`)) { await api.skills.removeCategory(category.id); await onChange(); } }}>
                <Trash2 className="size-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {category.skills.map((skill) => (
                <button
                  key={skill.id}
                  className="badge badge-lg badge-neutral gap-1"
                  onClick={async () => { await api.skills.remove(skill.id); await onChange(); }}
                  title="Remove skill"
                >
                  {skill.name} ×
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function BlogsPanel({ items, onChange }: { items: Blog[]; onChange: () => Promise<void> }) {
  const empty = { title: '', content: '', imageUrl: '' };
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      if (editingId) await api.blogs.update(editingId, form);
      else await api.blogs.create(form);
      setForm(empty);
      setEditingId(null);
      await onChange();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8">
      <form className="card bg-base-200 border border-primary/10" onSubmit={submit}>
        <div className="card-body">
          <h2 className="card-title">{editingId ? 'Edit post' : 'Add post'}</h2>
          {message && <div className="alert alert-error text-sm">{message}</div>}
          <input className="input input-bordered" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <input className="input input-bordered" placeholder="Cover image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} required />
          <textarea className="textarea textarea-bordered min-h-40" placeholder="Content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required />
          <div className="card-actions justify-end">
            {editingId && <button type="button" className="btn btn-ghost" onClick={() => { setEditingId(null); setForm(empty); }}>Cancel</button>}
            <button className="btn btn-primary" disabled={busy}>{busy ? 'Saving...' : editingId ? 'Update' : 'Publish'}</button>
          </div>
        </div>
      </form>
      <div className="space-y-3">
        {items.length === 0 && <p className="text-gray-400">No posts yet. Published writing appears on the public site.</p>}
        {items.map((item) => (
          <article key={item.id} className="p-4 rounded-xl bg-base-200 flex gap-4">
            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-2">{item.content}</p>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => { setEditingId(item.id); setForm({ title: item.title, content: item.content, imageUrl: item.imageUrl }); }}>
              <Pencil className="size-4" />
            </button>
            <button className="btn btn-ghost btn-sm text-error" onClick={async () => { if (confirm('Delete this post?')) { await api.blogs.remove(item.id); await onChange(); } }}>
              <Trash2 className="size-4" />
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
