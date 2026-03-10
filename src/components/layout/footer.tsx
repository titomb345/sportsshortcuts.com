import { GitHubIcon, LinkedInIcon, BuyMeACoffeeIcon } from '../icons';

export function Footer() {
  return (
    <footer className="border-t border-divider py-5 mt-auto">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <span className="text-xs text-text-secondary">
            &copy; {new Date().getFullYear()}{' '}
            <a
              href="https://billbergquist.dev/services/"
              target="_blank"
              rel="noopener"
              className="text-text-secondary no-underline hover:underline"
            >
              Website by BillBergquist.dev
            </a>
          </span>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/titomb345/sportsshortcuts.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-text-secondary opacity-70 hover:opacity-100 transition-opacity flex"
            >
              <GitHubIcon size={18} />
            </a>
            <a
              href="https://linkedin.com/in/bill-bergquist"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-text-secondary opacity-70 hover:opacity-100 transition-opacity flex"
            >
              <LinkedInIcon size={18} />
            </a>
            <a
              href="https://buymeacoffee.com/titomb345"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buy Me a Coffee"
              className="text-text-secondary opacity-70 hover:opacity-100 transition-opacity flex"
            >
              <BuyMeACoffeeIcon size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
