import { DayOfWeek } from '../../types';
import StatusUpdate from '../../components/status-update';
import { makePossessive } from '../../utils/text';

type GenerationsProps = {
  playerName: string;
  injury: string;
  dayOfWeek: DayOfWeek;
  mascot: string;
};

export function Generations({ playerName, injury, dayOfWeek, mascot }: GenerationsProps) {
  const benchSlug = `has returned to${mascot ? ` ${makePossessive(mascot)}` : ''} bench`;

  const templates = [
    { middleSlug: 'headed to locker room', injury },
    { middleSlug: 'headed to locker room again', injury },
    { middleSlug: 'helped to locker room', injury },
    { middleSlug: 'carted to locker room', injury },
    { middleSlug: 'stretchered to locker room', injury },
    { middleSlug: 'in locker room', injury },
    { middleSlug: 'has returned to', endSlug: "'s game", injury },
    { middleSlug: benchSlug, injury },
    { middleSlug: 'available to return', injury },
    { middleSlug: 'probable to return', injury },
    { middleSlug: 'will return', injury },
    { middleSlug: 'expected to return', injury },
    { middleSlug: 'questionable to return', injury },
    { middleSlug: 'doubtful to return', injury },
    { middleSlug: "won't return", injury },
    { middleSlug: 'will start second half', injury },
    { middleSlug: 'remains in locker room to start second half', injury },
    {
      middleSlug: 'has been ejected',
      endSlug: ' after being assessed a Flagrant 2 foul',
    },
    {
      middleSlug: 'has been ejected',
      endSlug: ' after being assessed two Flagrant 1 fouls',
    },
    {
      middleSlug: 'has been ejected',
      endSlug: ' after being assessed two technical fouls',
    },
    { middleSlug: 'has been ejected' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-text-disabled text-[0.65rem] font-semibold tracking-widest uppercase">
          Generated Alerts
        </span>
        <span className="text-text-disabled text-xs font-medium">
          {templates.length} templates
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {templates.map((t, i) => (
          <StatusUpdate
            key={`${t.middleSlug}-${t.endSlug ?? ''}`}
            playerName={playerName}
            injury={t.injury}
            dayOfWeek={dayOfWeek}
            middleSlug={t.middleSlug}
            endSlug={t.endSlug}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}

export default Generations;
