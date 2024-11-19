import { Activity, ArrowRightLeft, ArrowUpRight, Folder, Github, Linkedin, Mail, Map, MapPin, Phone } from "lucide-react"
import NavBar from "./NavBar"

function App() {
  const projects = [
    {
      title: "Design With Ace ",
      description: " Architectural Portfolio",
      image: "/design-with-ace.png",
      url: "https://architect-portfolio-v2.vercel.app/"
    },
    {
      title: "James Carson Design",
      description: "Movies Portfolio",
      image: "/james-carson.png",
      url: "jamescarsondesign.com"
    },
    {
      title: "Brew Masters ",
      description: "Bear Production Company website",
      image: "/brewmaster.png",
      url: "brewmasters.com"
    },
  ]
  const experience = [
    {
      company:"Pamatech Solution",
      title: "Software Engineer",
      description: "Worked on multiple projects including school management system, Chama management system",
      date: "2024 - PRESENT",
      url: "https://pamatech.co.ke/"
    },{
      company: "Zetu Academy",
      title: "Software Engineer",
      description: "Worked on multiple projects using next.js and wordpress",
      date: "Dec 2023 - Mar 2024",
      url: "https://zetujobs.com/", 
    },
    {
      company: "The Jitu",
      title: "Quality Assurance",
      description: "Performed different tests including performance and end-to-end tests along collaborating with developers",
      date: "Jun 2023 - Sep 2023",
      url: "https://thejitu.com/"
    }
  ]
  return (

    <>
      <div className='min-h-screen w-screen font-sans'>
        <NavBar />
        {/* Body */}

        <div className="flex flex-col md:flex-row max-w-6xl mx-auto gap-8 gap-x-20 items-start">
          {/* profile */}
          <div className="rounded-lg bg-secondary-content text-gray-400 p-12 relative md:sticky md:top-28 top-0 w-full md:max-w-72 flex flex-col items-center gap-4">
            <div className="avatar border-4 rounded-lg overflow-hidden">
              <div className="w-40  ">
                <img src="/profile.jpg" className="" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="uppercase font-[800] text-xl text-center">Kinuthia Samuel Mwaniki</h3>
              <p className="text-gray-500 font-semibold ">A skilled <span className="badge badge-primary"> full-stack developer</span> crafting scalable, user-focused solutions with expertise in <span className="badge badge-secondary">React</span>, <span className="badge badge-secondary">Next Js</span>, <span className="badge badge-secondary">Node js</span> and <span className="badge badge-secondary">Wordpress</span></p>
              <div className="flex gap-4 items-center text-black ">
                <a href="#" className="btn btn-sm "><Mail className="size-4" /></a>
                <a href="#" className="btn btn-sm"><Linkedin className="size-4" /></a>
                <a href="#" className="btn btn-sm"><Github className="size-4" /></a>
                <a href="#" className="btn btn-sm"><Phone className="size-4" /></a>
              </div>
            </div>


          </div>
          {/* body */}
          <div className="flex-1">
            <div id="home" className="">
              <h2 className="text-8xl uppercase font-bold" >Software <span className="text-gray-600">Engineer</span></h2>
              <p className="max-w-lg text-lg mt-8 text-gray-400">Passionate about creating intuitive and engaging user experiences. Specialize in transforming ideas into beautifully crafted products.</p>
              {/* stats */}
              <div className="mt-8 ">
                <div className="stats shadow">
                  <div className="stat">
                    <div className="stat-figure text-primary">
                      <Activity className="text-primary" />
                    </div>
                    <div className="stat-value text-primary">+3 YEARS</div>
                    <div className="stat-desc">YEARS OF EXPERIENCE</div>
                  </div>

                  <div className="stat">
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
              <h2 className="text-8xl uppercase font-bold" >Recent <span className="text-gray-600">Projects</span></h2>
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
              <h2 className="text-8xl uppercase font-bold" >Years Of <span className="text-gray-600">Experience</span></h2>
              <div className=" my-8">
                {experience.map(exper => (
                  <a href={exper.url} target="_blank" key={exper.url} className="p-6 group rounded-lg hover:bg-gray-700 duration-300 animation flex">
                      <div className="flex-1 h-full flex flex-col justify-center">
                        <h4>{exper.title}</h4>
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
            {/* Skills */}
            <div id="skills" className="mt-8 md:mt-12">
              <h2 className="text-8xl uppercase font-bold" >Years Of <span className="text-gray-600">Experience</span></h2>
              <div className=" my-8">
                {experience.map(exper => (
                  <a href={exper.url} target="_blank" key={exper.url} className="p-6 group rounded-lg hover:bg-gray-700 duration-300 animation flex">
                      <div className="flex-1 h-full flex flex-col justify-center">
                        <h4>{exper.title}</h4>
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
          </div>
        </div>
      </div>
    </>
  )
}

export default App
