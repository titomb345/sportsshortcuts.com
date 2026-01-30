import { Box, Stack, Typography } from '@mui/material';
import { usePageTitle, useShowGenerations } from '../../hooks';
import Generations from './generations';
import Inputs from '../../components/inputs';
import { useContext } from 'react';
import { InputsContext } from '../../components/inputs-context';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

export function NbaGenerator() {
  const {
    playerName,
    setPlayerName,
    injury,
    setInjury,
    mascot,
    setMascot,
    dayOfWeek,
    setDayOfWeek,
  } = useContext(InputsContext);
  const { showGenerations } = useShowGenerations(playerName);

  usePageTitle('Sports Shortcuts | NBA');

  return (
    <Stack spacing={3}>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <SportsBasketballIcon
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
            NBA Status Generator
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
          mascot={mascot}
          setMascot={setMascot}
        />
        {showGenerations && (
          <Generations
            playerName={playerName}
            injury={injury}
            dayOfWeek={dayOfWeek}
            mascot={mascot}
          />
        )}
      </Stack>
    </Stack>
  );
}

export default NbaGenerator;
