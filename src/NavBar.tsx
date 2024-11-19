import { FolderClosed, HomeIcon, Wine, WorkflowIcon, Wrench } from 'lucide-react'

const NavBar = () => {
    return (

        <div className="sticky top-0  z-10 flex justify-center items-center">
            <nav className=' p-4   flex justify-center items-center gap-4  rounded-lg bg-primary-content/70 shadow bg-inherit/60 '>
                <div className="tooltip tooltip-bottom" data-tip="Home">
                    <a href='#home' className="btn"><HomeIcon /></a>
                </div>
                <div className="tooltip tooltip-bottom" data-tip="Projects">
                    <a href='#projects' className="btn"><FolderClosed /></a>
                </div>
                <div className="tooltip tooltip-bottom" data-tip="Experience">
                    <a href='#experience' className="btn"><WorkflowIcon /></a>
                </div>
                <div className="tooltip tooltip-bottom" data-tip="Tools">
                    <a href='#tools' className="btn"><Wrench /></a>
                </div>
                <div className="tooltip tooltip-bottom" data-tip="Skills">
                    <a href='#skills' className="btn"><Wine /></a>
                </div>
            </nav>
        </div>
    )
}

export default NavBar