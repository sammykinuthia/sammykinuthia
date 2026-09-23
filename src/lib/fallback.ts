import type { Experience, Project, SkillCategory } from './api';

export const fallbackProjects: Project[] = [
  {
    id: 'fallback-design-with-ace',
    title: 'Design With Ace',
    description: 'Architectural portfolio for a design studio, built for a polished, client-facing presence.',
    imageUrl: '/design-with-ace.png',
    link: 'https://designwithace.co.ke/',
  },
  {
    id: 'fallback-james-carson',
    title: 'James Carson Design',
    description: 'A cinematic movies portfolio with a strong visual identity and custom layout.',
    imageUrl: '/james-carson.png',
    link: 'https://jamescarsondesign.com',
  },
  {
    id: 'fallback-brewmaster',
    title: 'Brewmaster Ltd',
    description: 'Website for a beer production company, focused on brand storytelling and conversion.',
    imageUrl: '/brewmaster.png',
    link: 'https://brewmaster.co.tz',
  },
];

export const fallbackExperience: Experience[] = [
  {
    id: 'fallback-griffin',
    company: 'Griffin Global Tech',
    title: 'Software Developer — Internship',
    description: 'Collaborated with developers to ship reliable software and keep quality high across releases.',
    startDate: '2025-01-01',
    endDate: '2025-03-31',
    link: 'https://www.griffinglobaltech.com/',
  },
  {
    id: 'fallback-zetu',
    company: 'Zetu Academy',
    title: 'Software Engineer — Internship',
    description: 'Shipped multiple projects with Next.js and WordPress, from layout to production.',
    startDate: '2023-12-01',
    endDate: '2024-03-31',
    link: 'https://zetujobs.com/',
  },
  {
    id: 'fallback-jitu',
    company: 'The Jitu',
    title: 'Quality Assurance — Internship',
    description: 'Ran performance and end-to-end tests while working closely with the development team.',
    startDate: '2023-06-01',
    endDate: '2023-09-30',
    link: 'https://thejitu.com/',
  },
];

export const fallbackSkills: SkillCategory[] = [
  { id: 'web', name: 'Web Development', skills: ['React', 'Next.js', 'Remix', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Tailwind CSS', 'Bootstrap', 'WordPress'].map((name, i) => ({ id: `web-${i}`, name })) },
  { id: 'mobile', name: 'Mobile Development', skills: [{ id: 'rn', name: 'React Native' }] },
  { id: 'backend', name: 'Backend Development', skills: ['FastAPI', 'PocketBase', 'Node.js', 'Django'].map((name, i) => ({ id: `be-${i}`, name })) },
  { id: 'db', name: 'Databases & Storage', skills: ['PostgreSQL', 'Firebase', 'MySQL', 'MongoDB'].map((name, i) => ({ id: `db-${i}`, name })) },
  { id: 'ds', name: 'Data Science', skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter Notebooks', 'Scikit-learn'].map((name, i) => ({ id: `ds-${i}`, name })) },
  { id: 'scrape', name: 'Web Scraping', skills: ['Puppeteer', 'Beautiful Soup'].map((name, i) => ({ id: `sc-${i}`, name })) },
  { id: 'qa', name: 'Quality Assurance', skills: ['Test Automation', 'Jest', 'Vitest', 'Cypress', 'Debugging', 'Playwright'].map((name, i) => ({ id: `qa-${i}`, name })) },
  { id: 'tools', name: 'Tools & Platforms', skills: ['Expo', 'Tauri', 'Cloudflare', 'Docker', 'Git', 'Vercel', 'Netlify', 'VPS'].map((name, i) => ({ id: `tl-${i}`, name })) },
  { id: 'langs', name: 'Programming Languages', skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Rust'].map((name, i) => ({ id: `lg-${i}`, name })) },
];
