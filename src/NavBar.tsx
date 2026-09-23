import { Link } from 'react-router-dom';
import {
  BookOpen,
  FolderClosed,
  HomeIcon,
  LayoutDashboard,
  Sparkles,
  WorkflowIcon,
} from 'lucide-react';
import { useAuth } from './lib/useAuth';

const NavBar = () => {
  const { isAdmin } = useAuth();

  return (
    <div className="sticky top-0 z-20 flex justify-center items-center py-3">
      <nav className="px-3 py-2 flex justify-center items-center gap-2 rounded-2xl bg-base-200/80 border border-primary/20 shadow-lg backdrop-blur-md">
        <div className="tooltip tooltip-bottom" data-tip="Home">
          <Link to="/#home" className="btn btn-ghost btn-sm">
            <HomeIcon className="size-5" />
          </Link>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Projects">
          <a href="/#projects" className="btn btn-ghost btn-sm">
            <FolderClosed className="size-5" />
          </a>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Experience">
          <a href="/#experience" className="btn btn-ghost btn-sm">
            <WorkflowIcon className="size-5" />
          </a>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Skills">
          <a href="/#skills" className="btn btn-ghost btn-sm">
            <Sparkles className="size-5" />
          </a>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Writing">
          <a href="/#writing" className="btn btn-ghost btn-sm">
            <BookOpen className="size-5" />
          </a>
        </div>
        {isAdmin && (
          <div className="tooltip tooltip-bottom" data-tip="Dashboard">
            <Link to="/admin" className="btn btn-primary btn-sm">
              <LayoutDashboard className="size-5" />
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
