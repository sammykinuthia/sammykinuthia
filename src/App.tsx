import { useEffect, useState } from 'react';
import { Activity, ArrowUpRight, Folder, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { api, type Blog, type Experience, type Project, type SkillCategory } from './lib/api';
import { fallbackExperience, fallbackProjects, fallbackSkills } from './lib/fallback';

function formatRange(start: string, end?: string | null) {
  const startLabel = new Date(start).toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
  if (!end) return `${startLabel} — Present`;
  return `${startLabel} — ${new Date(end).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}`;
}

function App() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [experience, setExperience] = useState<Experience[]>(fallbackExperience);
  const [skills, setSkills] = useState<SkillCategory[]>(fallbackSkills);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, experienceRes, skillsRes, blogsRes] = await Promise.allSettled([
          api.projects.list(),
          api.experiences.list(),
          api.skills.list(),
          api.blogs.list(),
        ]);

        if (projectsRes.status === 'fulfilled' && projectsRes.value.length > 0) {
          setProjects(projectsRes.value);
        }
        if (experienceRes.status === 'fulfilled' && experienceRes.value.length > 0) {
          setExperience(experienceRes.value);
        }
        if (skillsRes.status === 'fulfilled' && skillsRes.value.length > 0) {
          setSkills(skillsRes.value);
        }
        if (blogsRes.status === 'fulfilled') {
          setBlogs(blogsRes.value);
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, []);

  return (
    <div id="home" className="min-h-screen w-full font-sans">
      <NavBar />
      <div className="flex flex-col md:flex-row max-w-6xl p-4 mx-auto gap-8 lg:gap-x-16 items-start">
        <aside className="rounded-2xl bg-secondary-content/80 border border-primary/10 text-gray-400 p-10 md:sticky md:top-24 z-0 w-full md:max-w-72 flex flex-col items-center gap-4 shadow-xl">
          <div className="avatar border-4 border-primary/40 rounded-xl overflow-hidden">
            <div className="w-40">
              <img src="/profile.jpg" alt="Samuel Mwaniki" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="uppercase font-[800] text-xl text-center text-base-content">Kinuthia Samuel Mwaniki</h3>
            <p className="text-gray-500 font-semibold leading-relaxed">
              A skilled <span className="badge badge-primary">full-stack</span> developer and{' '}
              <span className="badge badge-accent">Q.A. Engineer</span> crafting scalable, user-focused solutions with expertise in{' '}
              <span className="badge badge-secondary">React</span>, <span className="badge badge-secondary">Next.js</span>,{' '}
              <span className="badge badge-secondary">Node.js</span> and a vast array of testing tools.
            </p>
            <div className="flex gap-3 items-center justify-center">
              <a href="mailto:kinuthiasamuel05@gmail.com" className="btn btn-sm" aria-label="Email">
                <Mail className="size-4" />
              </a>
              <a href="https://www.linkedin.com/in/samuel-kinuthia99" target="_blank" rel="noopener noreferrer" className="btn btn-sm" aria-label="LinkedIn">
                <Linkedin className="size-4" />
              </a>
              <a href="https://www.github.com/sammykinuthia" target="_blank" rel="noopener noreferrer" className="btn btn-sm" aria-label="GitHub">
                <Github className="size-4" />
              </a>
              <a href="tel:+254790360980" className="btn btn-sm" aria-label="Phone">
                <Phone className="size-4" />
              </a>
            </div>
            <a href="mailto:kinuthiasamuel05@gmail.com" className="btn btn-primary w-full mt-2">
              Available for Hire
            </a>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <section>
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl uppercase font-bold leading-[0.95]">
              Software <span className="text-base-content/40">Engineer</span>
            </h2>
            <p className="max-w-lg text-lg mt-8 text-gray-400">
              Passionate about building exceptional digital experiences and ensuring their quality. I specialize in full-stack development and quality assurance, bringing a comprehensive perspective to every project. I am currently seeking new opportunities to contribute to innovative work.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="stat bg-base-200/60 rounded-xl shadow">
                <div className="stat-figure text-primary">
                  <Activity />
                </div>
                <div className="stat-value text-primary">+3 YEARS</div>
                <div className="stat-desc">OF EXPERIENCE</div>
              </div>
              <div className="stat bg-base-200/60 rounded-xl shadow">
                <div className="stat-figure text-primary">
                  <Folder />
                </div>
                <div className="stat-value text-primary">+{Math.max(10, projects.length)}</div>
                <div className="stat-desc">COMPLETED PROJECTS</div>
              </div>
            </div>
          </section>

          <section id="projects" className="mt-12 md:mt-16 scroll-mt-24">
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl uppercase font-bold leading-[0.95]">
              Recent <span className="text-base-content/40">Projects</span>
            </h2>
            <div className="my-8 space-y-2">
              {loading && projects.length === 0 && <div className="skeleton h-28 w-full" />}
              {projects.map((project) => (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={project.id}
                  className="p-5 group rounded-xl hover:bg-base-200 duration-300 flex gap-4 border border-transparent hover:border-primary/20"
                >
                  <div className="flex-1 flex gap-4 min-w-0">
                    <div className="w-28 aspect-[6/7] overflow-hidden rounded-lg shrink-0 bg-base-300">
                      <img src={project.imageUrl} alt={project.title} className="object-cover w-full h-full group-hover:scale-105 duration-300" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      <h4 className="font-semibold text-lg">{project.title}</h4>
                      <p className="text-gray-400 mt-1">{project.description}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="shrink-0 group-hover:size-8 group-hover:-translate-y-1 group-hover:translate-x-1 duration-300 group-hover:text-primary" />
                </a>
              ))}
            </div>
          </section>

          <section id="experience" className="mt-12 md:mt-16 scroll-mt-24">
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl uppercase font-bold leading-[0.95]">
              Years Of <span className="text-base-content/40">Experience</span>
            </h2>
            <div className="my-8 space-y-2">
              {experience.map((exp) => {
                const body = (
                  <>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">
                        {exp.company} — <span className="font-normal text-base-content/70">{exp.title}</span>
                      </h4>
                      <p className="text-gray-400 mt-1">{exp.description}</p>
                      <p className="text-primary/80 text-sm mt-2">{formatRange(exp.startDate, exp.endDate)}</p>
                    </div>
                    <ArrowUpRight className="shrink-0 group-hover:size-8 group-hover:-translate-y-1 group-hover:translate-x-1 duration-300 group-hover:text-primary" />
                  </>
                );

                return exp.link ? (
                  <a key={exp.id} href={exp.link} target="_blank" rel="noopener noreferrer" className="p-5 group rounded-xl hover:bg-base-200 duration-300 flex gap-4 border border-transparent hover:border-primary/20">
                    {body}
                  </a>
                ) : (
                  <div key={exp.id} className="p-5 group rounded-xl hover:bg-base-200 duration-300 flex gap-4">
                    {body}
                  </div>
                );
              })}
            </div>
          </section>

          <section id="skills" className="mt-12 md:mt-16 scroll-mt-24">
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl uppercase font-bold leading-[0.95]">
              Skills <span className="text-base-content/40">and Tools</span>
            </h2>
            <div className="my-8 space-y-2">
              {skills.map((category) => (
                <div key={category.id} className="p-5 rounded-xl hover:bg-base-200 duration-300 border border-transparent hover:border-primary/20">
                  <h4 className="font-semibold">{category.name}</h4>
                  <div className="flex gap-2 items-start flex-wrap mt-3">
                    {category.skills.map((skill) => (
                      <span key={skill.id} className="text-gray-300 bg-neutral/80 px-3 py-1 rounded-full text-sm">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {blogs.length > 0 && (
            <section id="writing" className="mt-12 md:mt-16 scroll-mt-24">
              <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl uppercase font-bold leading-[0.95]">
                Recent <span className="text-base-content/40">Writing</span>
              </h2>
              <div className="my-8 space-y-2">
                {blogs.map((blog) => (
                  <Link
                    key={blog.id}
                    to={`/blog/${blog.id}`}
                    className="p-5 group rounded-xl hover:bg-base-200 duration-300 flex gap-4 border border-transparent hover:border-primary/20"
                  >
                    <div className="w-28 aspect-[6/7] overflow-hidden rounded-lg shrink-0 bg-base-300">
                      <img src={blog.imageUrl} alt="" className="object-cover w-full h-full group-hover:scale-105 duration-300" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{blog.title}</h4>
                      <p className="text-gray-400 mt-1 line-clamp-3">{blog.content}</p>
                    </div>
                    <ArrowUpRight className="shrink-0 group-hover:text-primary duration-300" />
                  </Link>
                ))}
              </div>
            </section>
          )}

          <footer className="my-12 border-t border-base-content/10 pt-2">
            <h3 className="text-3xl md:text-4xl uppercase font-bold my-8">
              Socials <span className="text-base-content/40">& Contacts</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 px-2">
              <p className="text-gray-400">Phone: <a href="tel:+254790360980" className="underline decoration-primary/50 underline-offset-4">+254 790 360 980</a></p>
              <p className="text-gray-400">Email: <a href="mailto:kinuthiasamuel05@gmail.com" className="underline decoration-primary/50 underline-offset-4">kinuthiasamuel05@gmail.com</a></p>
              <p className="text-gray-400">GitHub: <a href="https://github.com/sammykinuthia" target="_blank" rel="noopener noreferrer" className="underline decoration-primary/50 underline-offset-4">sammykinuthia</a></p>
              <p className="text-gray-400">LinkedIn: <a href="https://www.linkedin.com/in/samuel-kinuthia99" target="_blank" rel="noopener noreferrer" className="underline decoration-primary/50 underline-offset-4">samuel-kinuthia99</a></p>
              <p className="text-gray-400">Twitter: <a href="https://x.com/Sammkinuthia" target="_blank" rel="noopener noreferrer" className="underline decoration-primary/50 underline-offset-4">@sammykinuthia</a></p>
            </div>
            <p className="px-2 mt-8 text-xs text-base-content/30">
              <Link to="/login" className="hover:text-primary">Admin</Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
