import { DayOfWeek } from '../../types';
import StatusUpdate from '../../components/status-update';

type GenerationsProps = {
  playerName: string;
  injury: string;
  dayOfWeek: DayOfWeek;
};

const TEMPLATES = [
  { middleSlug: 'headed to locker room' },
  { middleSlug: 'headed to medical tent' },
  { middleSlug: 'carted to locker room' },
  { middleSlug: 'questionable to return' },
  { middleSlug: 'remains in locker room' },
  { middleSlug: "won't return" },
  { middleSlug: 'will return' },
  { middleSlug: 'has returned to', endSlug: "'s game" },
  { middleSlug: 'unlikely to return' },
  { middleSlug: 'being evaluated for concussion', noInjury: true },
] as const;

export function Generations({ playerName, injury, dayOfWeek }: GenerationsProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-text-disabled text-[0.65rem] font-semibold tracking-widest uppercase">
          Generated Alerts
        </span>
        <span className="text-text-disabled text-xs font-medium">
          {TEMPLATES.length} templates
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {TEMPLATES.map((t, i) => (
          <StatusUpdate
            key={t.middleSlug}
            playerName={playerName}
            injury={'noInjury' in t ? undefined : injury}
            dayOfWeek={dayOfWeek}
            middleSlug={t.middleSlug}
            endSlug={'endSlug' in t ? t.endSlug : undefined}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}

export default Generations;
