import { Box, Paper, Stack, Typography } from '@mui/material';
import { usePageTitle, useShowGenerations } from '../../hooks';
import Generations from './generations';
import Inputs from '../../components/inputs';
import { useContext, useEffect } from 'react';
import { InputsContext } from '../../components/inputs-context';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import playersData from '../../data/players.json';

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

  usePageTitle('NBA Injury Status Alert Generator - Sports Shortcuts');

  useEffect(() => {
    setPlayerName('');
    setInjury('');
    setMascot('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack spacing={3}>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(107, 159, 232, 0.12)'
                  : 'rgba(23, 64, 139, 0.08)',
            }}
          >
            <SportsBasketballIcon
              sx={{
                fontSize: '1.5rem',
                color: 'primary.main',
              }}
            />
          </Box>
          <Box>
            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
              }}
            >
              NBA Status Generator
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: '48px',
            height: '3px',
            backgroundColor: 'primary.main',
            borderRadius: 2,
            ml: 7.5,
          }}
        />
      </Box>
      <Stack spacing={3}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Inputs
            playerName={playerName}
            setPlayerName={setPlayerName}
            injury={injury}
            setInjury={setInjury}
            dayOfWeek={dayOfWeek}
            setDayOfWeek={setDayOfWeek}
            mascot={mascot}
            setMascot={setMascot}
            players={playersData.nba}
          />
        </Paper>
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
