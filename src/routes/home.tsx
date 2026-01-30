import { Box, Paper, Stack, Typography } from '@mui/material';
import { usePageTitle } from '../hooks';
import { Link } from 'react-router-dom';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

export function Home() {
  usePageTitle('Sports Shortcuts');

  return (
    <Stack spacing={4} alignItems="center" sx={{ pt: 4 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 2,
            background: 'linear-gradient(135deg, #013369 0%, #17408B 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Sports Shortcuts
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            fontWeight: 400,
            maxWidth: '500px',
          }}
        >
          Generate standardized injury and status alerts for NFL and NBA players
        </Typography>
      </Box>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mt: 2 }}>
        <Paper
          elevation={2}
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 3,
            transition: 'all 0.2s ease-in-out',
            cursor: 'pointer',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 24px rgba(1, 51, 105, 0.2)',
            },
          }}
          component={Link}
          to="/nfl"
          style={{ textDecoration: 'none' }}
        >
          <SportsFootballIcon
            sx={{
              fontSize: '4rem',
              color: '#013369',
              mb: 2,
            }}
          />
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#013369', mb: 1 }}>
            NFL
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Football status alerts
          </Typography>
        </Paper>

        <Paper
          elevation={2}
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 3,
            transition: 'all 0.2s ease-in-out',
            cursor: 'pointer',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 24px rgba(23, 64, 139, 0.2)',
            },
          }}
          component={Link}
          to="/nba"
          style={{ textDecoration: 'none' }}
        >
          <SportsBasketballIcon
            sx={{
              fontSize: '4rem',
              color: '#17408B',
              mb: 2,
            }}
          />
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#17408B', mb: 1 }}>
            NBA
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Basketball status alerts
          </Typography>
        </Paper>
      </Stack>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Select a sport above to get started
        </Typography>
      </Box>
    </Stack>
  );
}

export default Home;
