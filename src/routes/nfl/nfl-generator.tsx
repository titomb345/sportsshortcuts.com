import { Box, Stack, Typography } from '@mui/material';
import { usePageTitle, useShowGenerations } from '../../hooks';
import Generations from './generations';
import Inputs from '../../components/inputs';
import { useContext } from 'react';
import { InputsContext } from '../../components/inputs-context';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';

export function NflGenerator() {
  const { playerName, setPlayerName, injury, setInjury, dayOfWeek, setDayOfWeek } =
    useContext(InputsContext);
  const { showGenerations } = useShowGenerations(playerName);

  usePageTitle('Sports Shortcuts | NFL');

  return (
    <Stack spacing={3}>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <SportsFootballIcon
            sx={{
              fontSize: '2rem',
              color: 'primary.main',
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: 'primary.main',
            }}
          >
            NFL Status Generator
          </Typography>
        </Box>
        <Box
          sx={{
            width: '60px',
            height: '4px',
            backgroundColor: 'primary.main',
            borderRadius: 2,
          }}
        />
      </Box>
      <Stack spacing={3}>
        <Inputs
          playerName={playerName}
          setPlayerName={setPlayerName}
          injury={injury}
          setInjury={setInjury}
          dayOfWeek={dayOfWeek}
          setDayOfWeek={setDayOfWeek}
        />
        {showGenerations && (
          <Generations playerName={playerName} injury={injury} dayOfWeek={dayOfWeek} />
        )}
      </Stack>
    </Stack>
  );
}

export default NflGenerator;
