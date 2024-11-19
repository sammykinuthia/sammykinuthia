import { FolderClosed, HomeIcon, Wine, WorkflowIcon, Wrench } from 'lucide-react'

const NavBar = () => {
    return (
        <nav className='sticky top-0 p-4  w-full flex justify-center items-center gap-4 bg-secondary-content/70 z-10'>
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
    )
}

export default NavBar