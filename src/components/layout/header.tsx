import { Link, useLocation } from 'react-router-dom';
import { useColorMode } from '../../theme';
import { FootballIcon, BasketballIcon, ZapIcon, SunIcon, MoonIcon } from '../icons';

const pages = [
  { name: 'NFL', path: '/nfl', icon: FootballIcon },
  { name: 'NBA', path: '/nba', icon: BasketballIcon },
];

export function Header() {
  const location = useLocation();
  const { mode, toggleColorMode } = useColorMode();

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/10"
      style={{ background: 'var(--sport-appbar-gradient)' }}
    >
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link
            to="/"
            className="flex items-center gap-2 text-white no-underline hover:opacity-90 transition-opacity"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-white/15">
              <ZapIcon size={18} />
            </div>
            <span className="font-display font-bold tracking-wider text-base sm:text-lg uppercase">
              SPORTS SHORTCUTS
            </span>
          </Link>

          <nav className="flex items-center gap-1" aria-label="Sport selection">
            {pages.map((page) => {
              const isActive = location.pathname.startsWith(page.path);
              const Icon = page.icon;
              return (
                <Link
                  key={page.name}
                  to={page.path}
                  className={`
                    flex items-center gap-1 px-3 sm:px-4 py-1.5 rounded-lg text-white text-sm font-semibold
                    transition-all duration-200 relative no-underline
                    ${isActive ? 'bg-white/15' : 'hover:bg-white/10'}
                  `}
                >
                  <Icon size={16} />
                  {page.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-[20%] right-[20%] h-0.5 bg-white rounded-t" />
                  )}
                </Link>
              );
            })}
            <button
              onClick={toggleColorMode}
              className="ml-2 p-2 rounded-full text-white hover:bg-white/10 transition-colors cursor-pointer bg-transparent border-none"
              aria-label={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {mode === 'light' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
