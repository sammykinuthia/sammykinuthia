import { FolderClosed, HomeIcon, Settings, Wine, WorkflowIcon, Wrench } from 'lucide-react'
import React from 'react'

const NavBar = () => {
    return (
        <nav className='sticky top-0 p-12 w-full flex justify-center items-center gap-4'>
            <div className="tooltip" data-tip="Home">
                <a href='#home' className="btn"><HomeIcon /></a>
            </div>
            <div className="tooltip" data-tip="Projects">
                <a href='#projects' className="btn"><FolderClosed /></a>
            </div>
            <div className="tooltip" data-tip="Experience">
                <a href='#experience' className="btn"><WorkflowIcon /></a>
            </div>
            <div className="tooltip" data-tip="Tools">
                <a href='#tools' className="btn"><Wrench /></a>
            </div>
            <div className="tooltip" data-tip="Skills">
                <a href='#skills' className="btn"><Wine /></a>
            </div>
        </nav>
    )
}

export default NavBar