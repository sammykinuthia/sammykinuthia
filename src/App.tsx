import { Activity, ArrowUpRight, Folder, Github, Linkedin, Mail, Phone } from "lucide-react"
import NavBar from "./NavBar"

function App() {
  const projects = [
    {
      title: "Design With Ace ",
      description: " Architectural Portfolio",
      image: "/design-with-ace.png",
      url: "https://designwithace.co.ke/"
    },
    {
      title: "James Carson Design",
      description: "Movies Portfolio",
      image: "/james-carson.png",
      url: "https://jamescarsondesign.com"
    },
    {
      title: "Brewmaster Lmt ",
      description: "Bear Production Company website",
      image: "/brewmaster.png",
      url: "https://brewmaster.co.tz"
    },
  ]
  const experience = [
    {
      company: "Griffin Global Tech",
      title: "Software Developer - Internship",
      description: "Working in collaboration with developers to ensure shipment of Quality and Reliable softwares",
      date: "Jan 2025 - Mar 2025",
      url: "https://www.griffinglobaltech.com/"
    }, {
      company: "Zetu Academy",
      title: "Software Engineer - Internship",
      description: "Worked on multiple projects using next.js and wordpress",
      date: "Dec 2023 - Mar 2024",
      url: "https://zetujobs.com/",
    },
    {
      company: "The Jitu",
      title: "Quality Assurance - Internship",
      description: "Performed different tests including performance and end-to-end tests along side collaborating with developers",
      date: "Jun 2023 - Sep 2023",
      url: "https://thejitu.com/"
    }
  ]

  const skills: { name: string, skills: string[] }[] = [
    {
      name: "Web Development",
      skills: [
        "React",
        "Next.js",
        "Remix",
        "JavaScript",
        "TypeScript",
        "HTML/CSS",
        "Tailwind CSS",
        "Bootstrap",
        "WordPress"
      ]
    },
    {
      name: "Mobile Development",
      skills: [
        "React Native"
      ]
    },
    {
      name: "Backend Development",
      skills: [
        "FastAPI",
        "PocketBase",
        "Node.js",
        "Django",
      ]
    },
    {
      name: "Databases & Storage",
      skills: [
        "PostgreSQL",
        "Firebase",
        "Mysql",
        "Mongo db",
      ]
    },
    {
      name: "Data Science",
      skills: [
        "Python",
        "Pandas",
        "NumPy",
        "Matplotlib",
        "Seaborn",
        "Jupyter Notebooks",
        "Machine Learning (Scikit-learn)"
      ]
    },
    {
      name: "Web Scraping",
      skills: [
        "Puppeteer",
        "Beautiful Soup",
      ]
    },
    {
      name: "Quality Assurance",
      skills: [
        "Test Automation",
        "Jest",
        "Vitest",
        "Cypress",
        "Debugging",
        "Playwrite"
      ]
    },
    {
      name: "Tools & Platforms",
      skills: [
        "Expo",
        "tauri",
        "Cloudflare",
        "Docker",
        "Git",
        "Vercel",
        "Netlify",
        "VPS"
      ]
    },
    {
      name: "Programming Languages",
      skills: [
        "JavaScript",
        "TypeScript",
        "Python",
        "Java",
        "rust"
      ]
    }
  ];

  return (

    <>
      <div id="home" className='min-h-screen w-screen font-sans'>
        <NavBar />
        {/* Body */}
        <div className="flex flex-col md:flex-row  max-w-6xl p-4 mx-auto gap-8 gap-x-20 items-start">
          {/* profile */}
          <div className="rounded-lg bg-secondary-content text-gray-400 p-12 relative md:sticky md:top-28 top-0 w-full md:max-w-72 flex flex-col items-center gap-4">
            <div className="avatar border-4 rounded-lg overflow-hidden">
              <div className="w-40 b  ">
                <img src="/profile.jpg" className="" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="uppercase font-[800] text-xl text-center">Kinuthia Samuel Mwaniki</h3>
              <p className="text-gray-500 font-semibold ">A skilled <span className="badge badge-primary"> full-stack </span> <span className="badge badge-accent"> Q.A. Engineer </span> crafting scalable, user-focused solutions with expertise in <span className="badge badge-secondary">React</span>, <span className="badge badge-secondary">Next Js</span>, <span className="badge badge-secondary">Node js</span> and <span className="badge badge-secondary">vast testing tools</span></p>
              <div className="flex gap-4 items-center text-black ">
                <a href="mailto:kinuthiasamuel05@gmail.com" className="btn btn-sm "><Mail className="size-4" /></a>
                <a href="https://www.linkedin.com/in/samuel-kinuthia99" target="_blank" className="btn btn-sm"><Linkedin className="size-4" /></a>
                <a href="https://www.github.com/sammykinuthia" target="_blank" className="btn btn-sm"><Github className="size-4" /></a>
                <a href="tel:+254790360980" className="btn btn-sm"><Phone className="size-4" /></a>
              </div>
            </div>


          </div>
          {/* body */}
          <div className="flex-1">
            <div className="">
              <h2 className="text-5xl md:text-6xl lg:lg:text-7xl xl:lg:text-8xl uppercase font-bold" >Software <span className="text-gray-600">Engineer</span></h2>
              <p className="max-w-lg text-lg mt-8 text-gray-400">Passionate about ensuring seamless and high-quality user experiences. Specialize in testing, identifying, and resolving issues to ensure products meet the highest standards of functionality, usability, and performance.</p>
              {/* stats */}
              <div className="mt-8 ">
                <div className="grid grid-cols-1 md:grid-cols-2 ">
                  <div className="stat shadow">
                    <div className="stat-figure text-primary">
                      <Activity className="text-primary" />
                    </div>
                    <div className="stat-value text-primary">+3 YEARS</div>
                    <div className="stat-desc">YEARS OF EXPERIENCE</div>
                  </div>

                  <div className="stat shadow">
                    <div className="stat-figure text-primary">
                      <Folder />
                    </div>
                    <div className="stat-value text-primary">+10 </div>
                    <div className="stat-desc">COMPLETED PROJECTS</div>
                  </div>

                </div>
              </div>
            </div>
            {/* projects */}
            <div id="projects" className="mt-8 md:mt-12">
              <h2 className="text-5xl md:text-6xl lg:lg:text-7xl xl:lg:text-8xl uppercase font-bold" >Recent <span className="text-gray-600">Projects</span></h2>
              <div className=" my-8">
                {projects.map(project => (
                  <a href={project.url} target="_blank" key={project.url} className="p-6 group rounded-lg hover:bg-gray-700 duration-300 animation flex">
                    <div className="flex-1 flex gap-4">
                      <div className="w-32 aspect-[6/7] overflow-hidden">
                        <img src={project.image} className="object-cover w-full h-full" />
                      </div>
                      <div className="flex-1 h-full flex flex-col justify-center">
                        <h4>{project.title}</h4>
                        <p className="text-gray-400">{project.description}</p>
                      </div>
                    </div>
                    <div className="">
                      <ArrowUpRight className="group-hover:size-8 group-hover:-mt-4 group-hover:-mr-4 animation duration-300 group-hover:text-primary" />
                    </div>
                  </a>
                ))}

              </div>
            </div>
            {/* Experience */}
            <div id="experience" className="mt-8 md:mt-12">
              <h2 className="text-5xl md:text-6xl lg:lg:text-7xl xl:lg:text-8xl uppercase font-bold" >Years Of <span className="text-gray-600">Experience</span></h2>
              <div className=" my-8">
                {experience.map(exper => (
                  <a href={exper.url} target="_blank" key={exper.url} className="p-6 group rounded-lg hover:bg-gray-700 duration-300 animation flex">
                    <div className="flex-1 h-full flex flex-col justify-center">
                      <h4 className="font-semibold">{exper.company}</h4>
                      <p className="text-gray-400">{exper.description}</p>
                      <p className="text-gray-400">{exper.date}</p>
                    </div>
                    <div className="">
                      <ArrowUpRight className="group-hover:size-8 group-hover:-mt-4 group-hover:-mr-4 animation duration-300 group-hover:text-primary" />
                    </div>
                  </a>
                ))}

              </div>
            </div>
            {/* skills */}
            <div id="skills" className="mt-8 md:mt-12">
              <h2 className="text-5xl md:text-6xl lg:lg:text-7xl xl:lg:text-8xl uppercase font-bold" >Skills <span className="text-gray-600">and Tools</span></h2>
              <div className="my-8">
                {skills.map(skill => (
                  <div key={skill.name} className="p-6 group rounded-lg hover:bg-gray-700 duration-300 animation flex">
                    <div className="flex-1 h-full flex flex-col justify-center">
                      <h4 className="font-semibold">{skill.name}</h4>
                      <div className="flex gap-2 items-start flex-wrap mt-2">
                        {skill.skills.map(i => (
                          <p className="text-gray-400 bg-neutral p-1 px-2 rounded-badge ">{i}</p>
                        ))}
                      </div>
                    </div>

                  </div>
                ))}

              </div>
            </div>
            {/* footer */}
            <div className="my-12 border-t ">
              <h3 className="text-3xl md:text-4xl uppercase font-bold my-8">Socials <span className="text-gray-600">& Contacts</span></h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 justify-center px-8">
                <p className="text-gray-400 whitespace-nowrap">Phone: <a href="tel:+254790360980" className="underline">+254 790 360 980</a></p>
                <p className="text-gray-400 whitespace-nowrap">Email: <a href="mailto:kinuthiasamuel05@gmail.com" className="underline">kinuthiasamuel05@gmail.com</a></p>
                <p className="text-gray-400 whitespace-nowrap">GitHub: <a href="https://github.com/sammykinuthia" target="_blank" className="underline">sammykinuthia</a></p>
                <p className="text-gray-400 whitespace-nowrap">LinkedIn: <a href="https://www.linkedin.com/in/samuel-kinuthia99" target="_blank" className="underline">samuel-kinuthia99</a></p>
                <p className="text-gray-400 whitespace-nowrap">Twitter: <a href="https://x.com/Sammkinuthia?t=WBF5kAyfQoHz-QyaDCL97A&s=08" target="_blank" className="underline">@sammykinuthia</a></p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
