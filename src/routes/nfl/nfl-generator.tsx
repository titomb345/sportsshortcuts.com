import { usePageTitle, useShowGenerations } from '../../hooks';
import Generations from './generations';
import Inputs from '../../components/inputs';
import { useContext, useEffect } from 'react';
import { InputsContext } from '../../components/inputs-context';
import { FootballIcon } from '../../components/icons';
import playersData from '../../data/players.json';

const NFL_RED = '#d50a0a';

export function NflGenerator() {
  const { playerName, setPlayerName, injury, setInjury, dayOfWeek, setDayOfWeek } =
    useContext(InputsContext);
  const { showGenerations } = useShowGenerations(playerName);

  usePageTitle('NFL Injury Status Alert Generator - Sports Shortcuts');

  useEffect(() => {
    setPlayerName('');
    setInjury('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-6 pt-2 sm:pt-4">
      <div className="flex items-center gap-4 mb-2">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-white"
          style={{ backgroundColor: `var(--sport-secondary, ${NFL_RED})` }}
        >
          <FootballIcon size={24} />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-primary leading-none uppercase">
            NFL Status Generator
          </h1>
          <p className="text-text-secondary text-sm mt-0.5">
            Generate injury and status alerts for NFL players
          </p>
        </div>
      </div>

      <div
        className="p-5 sm:p-6 rounded-xl border border-divider bg-bg-paper border-t-[3px]"
        style={{ borderTopColor: `var(--sport-secondary, ${NFL_RED})` }}
      >
        <Inputs
          playerName={playerName}
          setPlayerName={setPlayerName}
          injury={injury}
          setInjury={setInjury}
          dayOfWeek={dayOfWeek}
          setDayOfWeek={setDayOfWeek}
          players={playersData.nfl}
        />
      </div>

      {showGenerations && (
        <Generations playerName={playerName} injury={injury} dayOfWeek={dayOfWeek} />
      )}
    </div>
  );
}

export default NflGenerator;
