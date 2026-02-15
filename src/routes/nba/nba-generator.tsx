import { Box, Paper, Stack, Typography } from '@mui/material';
import { usePageTitle, useShowGenerations } from '../../hooks';
import Generations from './generations';
import Inputs from '../../components/inputs';
import { useContext, useEffect } from 'react';
import { InputsContext } from '../../components/inputs-context';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import playersData from '../../data/players.json';
import { keyframes } from '@emotion/react';

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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
    <Stack spacing={3} sx={{ pt: { xs: 1, sm: 2 } }}>
      {/* ── Page Header ── */}
      <Box sx={{ animation: `${fadeUp} 0.5s ease-out` }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(107, 159, 232, 0.12)'
                  : 'primary.main',
              color: (theme) =>
                theme.palette.mode === 'dark' ? 'primary.main' : '#ffffff',
              flexShrink: 0,
            }}
          >
            <SportsBasketballIcon sx={{ fontSize: '1.5rem' }} />
          </Box>
          <Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontFamily: '"Oswald", sans-serif',
                fontWeight: 700,
                fontSize: { xs: '1.5rem', sm: '1.85rem' },
                color: 'primary.main',
                lineHeight: 1.1,
              }}
            >
              NBA Status Generator
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mt: 0.25,
                fontSize: '0.85rem',
              }}
            >
              Generate injury and status alerts for NBA players
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* ── Input Form ── */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3 },
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          borderTop: '3px solid',
          borderTopColor: 'primary.main',
          animation: `${fadeUp} 0.5s ease-out 0.1s both`,
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

      {/* ── Results ── */}
      {showGenerations && (
        <Box sx={{ animation: `${fadeUp} 0.4s ease-out` }}>
          <Generations
            playerName={playerName}
            injury={injury}
            dayOfWeek={dayOfWeek}
            mascot={mascot}
          />
        </Box>
      )}
    </Stack>
  );
}

export default NbaGenerator;
