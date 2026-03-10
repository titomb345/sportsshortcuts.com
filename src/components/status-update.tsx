import { DayOfWeek } from '../types';
import { useMemo, useState } from 'react';
import { CopyIcon, CheckIcon } from './icons';

const COPIED_FADE = 3000;

type TweetProps = {
  playerName: string;
  injury?: string;
  dayOfWeek: DayOfWeek;
  middleSlug: string;
  endSlug?: string;
  index?: number;
};

export function StatusUpdate({
  playerName,
  injury,
  dayOfWeek,
  middleSlug,
  endSlug = '',
}: TweetProps) {
  const [copied, setCopied] = useState(false);

  const text = useMemo(() => {
    let text = `Status alert: ${playerName.trim()}`;

    if (injury) {
      text += ` (${injury.trim()})`;
    }

    text += ` ${middleSlug} ${dayOfWeek}${endSlug}.`;

    return text;
  }, [playerName, injury, middleSlug, dayOfWeek, endSlug]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), COPIED_FADE);
  };

  return (
    <button
      onClick={handleCopy}
      className={`
        w-full text-left rounded-lg border border-divider
        transition-colors duration-200 cursor-pointer bg-bg-paper
        hover:bg-primary/[0.03]
        ${copied ? 'border-l-[3px] border-l-success' : 'border-l-[3px] border-l-secondary'}
      `}
    >
      <div className="flex items-center justify-between gap-4 py-3 px-5">
        <span className="font-mono text-[0.9rem] text-text-primary flex-1">
          {text}
        </span>
        {copied ? (
          <CheckIcon size={18} className="text-success shrink-0" />
        ) : (
          <CopyIcon size={18} className="text-text-disabled shrink-0" />
        )}
      </div>
    </button>
  );
}

export default StatusUpdate;
