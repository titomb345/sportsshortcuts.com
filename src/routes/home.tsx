import { usePageTitle } from '../hooks';
import { Link } from 'react-router-dom';
import { FootballIcon, BasketballIcon, ArrowRightIcon } from '../components/icons';

const NFL_BLUE = '#013369';
const NFL_RED = '#d50a0a';
const NBA_BLUE = '#17408B';
const NBA_ORANGE = '#f58426';

const TICKER_ALERTS = [
  'Patrick Mahomes (ankle) questionable to return Sunday.',
  'LeBron James (knee) headed to locker room Tuesday.',
  'Josh Allen (elbow) will return Sunday.',
  "Jayson Tatum (hamstring) won't return Friday.",
  'Tyreek Hill (hip) carted to locker room Monday.',
  'Stephen Curry (finger) probable to return Wednesday.',
  'Lamar Jackson (back) remains in locker room Sunday.',
  "Anthony Davis (foot) has returned to Tuesday's game.",
];

export function Home() {
  usePageTitle('Sports Shortcuts - NFL & NBA Injury Status Alert Generator');

  return (
    <div className="pt-8 sm:pt-12 md:pt-16 pb-4 sm:pb-8">
      {/* Title */}
      <div className="mb-6 sm:mb-8">
        <h1 className="font-display font-bold text-[2.75rem] sm:text-[3.75rem] md:text-[4.5rem] leading-[0.95] tracking-tight text-text-primary mb-3 uppercase">
          STATUS ALERTS
        </h1>
        <p className="text-text-secondary text-[0.95rem] sm:text-[1.05rem] max-w-[440px] leading-relaxed">
          Generate standardized injury and status updates for NFL and NBA
          players. Built for reporters, analysts, and fans.
        </p>
      </div>

      {/* Ticker */}
      <div className="mb-6 sm:mb-8 -mx-4 sm:-mx-6 overflow-hidden border-y border-divider bg-bg-paper/50 py-2.5">
        <div className="flex whitespace-nowrap animate-scroll hover:[animation-play-state:paused]">
          {[0, 1].map((pass) => (
            <div key={pass} className="flex shrink-0">
              {TICKER_ALERTS.map((alert, i) => (
                <span
                  key={`${pass}-${i}`}
                  className="font-mono text-[0.72rem] sm:text-[0.8rem] text-text-secondary px-4 inline-flex items-center gap-4"
                >
                  {alert}
                  <span className="w-1 h-1 rounded-full bg-text-disabled shrink-0" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Sport Cards */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <SportPanel
          to="/nfl"
          label="NFL"
          subtitle="Football injury & status alerts"
          icon={<FootballIcon size={56} className="sm:w-[72px] sm:h-[72px]" />}
          bgColor={NFL_BLUE}
          accentColor={NFL_RED}
        />
        <SportPanel
          to="/nba"
          label="NBA"
          subtitle="Basketball injury & status alerts"
          icon={<BasketballIcon size={56} className="sm:w-[72px] sm:h-[72px]" />}
          bgColor={NBA_BLUE}
          accentColor={NBA_ORANGE}
        />
      </div>

      {/* Tag */}
      <div
        className="inline-flex items-center gap-2 px-4 py-1 mt-8 rounded-full border border-divider bg-bg-paper/50"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_6px_rgba(34,197,94,0.4)]" />
        <span className="text-[0.65rem] font-semibold tracking-widest uppercase text-text-secondary">
          Free &amp; Open Source
        </span>
      </div>
    </div>
  );
}

type SportPanelProps = {
  to: string;
  label: string;
  subtitle: string;
  icon: React.ReactNode;
  bgColor: string;
  accentColor: string;
};

function SportPanel({
  to,
  label,
  subtitle,
  icon,
  bgColor,
  accentColor,
}: SportPanelProps) {
  return (
    <Link
      to={to}
      className="group flex-1 rounded-xl overflow-hidden relative no-underline transition-[transform,box-shadow] duration-200 hover:scale-[1.015]"
      style={{
        backgroundColor: bgColor,
        borderBottom: `4px solid ${accentColor}`,
      }}
    >
      {/* Background icon */}
      <div className="absolute bottom-[-10px] right-[-5px] opacity-[0.07] text-white pointer-events-none transition-opacity duration-300 group-hover:opacity-[0.12]">
        {icon}
      </div>

      <div className="p-6 sm:p-7 min-h-[160px] sm:min-h-[200px] flex flex-col justify-end relative z-[1]">
        <h2 className="font-display font-bold text-4xl sm:text-[2.75rem] text-white leading-none mb-1.5 uppercase">
          {label}
        </h2>
        <div className="flex items-center justify-between w-full">
          <span className="text-white/70 text-sm">{subtitle}</span>
          <ArrowRightIcon
            size={18}
            className="text-white/35 transition-transform duration-200 group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
}

export default Home;
