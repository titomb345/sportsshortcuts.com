import { usePageTitle } from '../hooks';
import { Link } from 'react-router-dom';
import { HomeIcon } from '../components/icons';

export function Error() {
  usePageTitle('Page Not Found - Sports Shortcuts');

  return (
    <div className="flex flex-col items-center gap-6 pt-16 sm:pt-24 text-center">
      <h1 className="text-6xl sm:text-8xl font-bold text-text-disabled leading-none">
        404
      </h1>
      <h2 className="text-xl font-medium text-text-secondary uppercase font-display tracking-wide">
        Page not found
      </h2>
      <div className="pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-divider text-text-primary font-semibold text-sm hover:bg-primary/5 transition-colors no-underline"
        >
          <HomeIcon size={18} />
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default Error;
