import { useMemo, useState, useRef, useEffect } from 'react';
import Fuse from 'fuse.js';
import { DayOfWeek } from '../types';
import { Player } from '../data/types';

type InputsProps = {
  playerName: string;
  setPlayerName: (name: string) => void;
  injury: string;
  setInjury: (injury: string) => void;
  dayOfWeek: DayOfWeek;
  setDayOfWeek: (day: DayOfWeek) => void;
  mascot?: string;
  setMascot?: (mascot: string) => void;
  players?: Player[];
};

const normalize = (str: string) => str.replace(/[.''-]/g, '');

const DAYS: DayOfWeek[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const inputClass =
  'w-full px-3 py-2 text-sm rounded-lg border border-divider bg-bg-input text-text-primary outline-none transition-shadow duration-200 hover:shadow-[0_0_0_3px_color-mix(in_srgb,var(--sport-primary)_15%,transparent)] focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--sport-primary)_25%,transparent)]';

const labelClass = 'block text-xs font-medium text-text-secondary mb-1.5';

export function Inputs({
  playerName,
  setPlayerName,
  injury,
  setInjury,
  dayOfWeek,
  setDayOfWeek,
  mascot,
  setMascot,
  players = [],
}: InputsProps) {
  const showMascot = Boolean(setMascot);

  const fuse = useMemo(
    () =>
      new Fuse(players, {
        keys: ['name'],
        threshold: 0.2,
        ignoreLocation: true,
        getFn: (obj, path) => {
          const value = Fuse.config.getFn(obj, path);
          if (typeof value === 'string') {
            return normalize(value);
          }
          return value;
        },
      }),
    [players]
  );

  return (
    <div
      className={`grid gap-3 ${
        showMascot
          ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4'
          : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
      }`}
    >
      <div>
        <label htmlFor="input-player" className={labelClass}>Player name (required)</label>
        <PlayerAutocomplete
          value={playerName}
          onChange={setPlayerName}
          onSelect={(player) => {
            if (setMascot && player) {
              setMascot(player.team);
            }
          }}
          players={players}
          fuse={fuse}
        />
      </div>
      <div>
        <label htmlFor="input-injury" className={labelClass}>Injury</label>
        <input
          id="input-injury"
          type="text"
          value={injury}
          onChange={(e) => setInjury(e.target.value)}
          className={inputClass}
        />
      </div>
      {showMascot && (
        <div>
          <label htmlFor="input-mascot" className={labelClass}>Mascot</label>
          <input
            id="input-mascot"
            type="text"
            value={mascot ?? ''}
            onChange={(e) => setMascot?.(e.target.value)}
            className={inputClass}
          />
        </div>
      )}
      <div>
        <label htmlFor="input-day" className={labelClass}>Day of Week</label>
        <select
          id="input-day"
          value={dayOfWeek}
          onChange={(e) => setDayOfWeek(e.target.value as DayOfWeek)}
          className={`${inputClass} cursor-pointer`}
        >
          {DAYS.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

/* ── Player Autocomplete ── */

type PlayerAutocompleteProps = {
  value: string;
  onChange: (value: string) => void;
  onSelect: (player: Player | null) => void;
  players: Player[];
  fuse: Fuse<Player>;
};

function PlayerAutocomplete({
  value,
  onChange,
  onSelect,
  players,
  fuse,
}: PlayerAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const options = useMemo(() => {
    const trimmed = value.trim();
    if (!trimmed) return players.slice(0, 50);
    return fuse
      .search(normalize(trimmed), { limit: 50 })
      .map((result) => result.item);
  }, [value, players, fuse]);

  useEffect(() => {
    setHighlightIndex(-1);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightIndex] as HTMLElement;
      if (item) {
        item.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen && e.key === 'ArrowDown') {
      setIsOpen(true);
      return;
    }
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev < options.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev > 0 ? prev - 1 : options.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightIndex >= 0 && options[highlightIndex]) {
          const player = options[highlightIndex];
          onChange(player.name);
          onSelect(player);
          setIsOpen(false);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <input
        id="input-player"
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        className={inputClass}
        role="combobox"
        aria-expanded={isOpen}
        aria-autocomplete="list"
        autoComplete="off"
      />
      {isOpen && options.length > 0 && (
        <ul
          ref={listRef}
          className="absolute z-50 w-full mt-1 max-h-60 overflow-auto rounded-lg border border-divider bg-bg-paper shadow-lg"
          role="listbox"
        >
          {options.map((player, i) => (
            <li
              key={`${player.name}-${player.team}`}
              role="option"
              aria-selected={i === highlightIndex}
              className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                i === highlightIndex
                  ? 'bg-primary/10 text-text-primary'
                  : 'text-text-primary hover:bg-primary/5'
              }`}
              onMouseEnter={() => setHighlightIndex(i)}
              onClick={() => {
                onChange(player.name);
                onSelect(player);
                setIsOpen(false);
              }}
            >
              {player.name}{' '}
              <span className="text-text-disabled">({player.team})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Inputs;
