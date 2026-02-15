import { Box, Card, CardActionArea, Stack, Typography } from '@mui/material';
import { usePageTitle } from '../hooks';
import { Link } from 'react-router-dom';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

const NFL_COLOR = '#013369';
const NBA_COLOR = '#17408B';
const NFL_COLOR_DARK = '#4A90D9';
const NBA_COLOR_DARK = '#5BA3E8';

export function Home() {
  usePageTitle('Sports Shortcuts - NFL & NBA Injury Status Alert Generator');

  return (
    <Stack spacing={5} alignItems="center" sx={{ pt: { xs: 6, sm: 8, md: 10 } }}>
      <Box sx={{ textAlign: 'center', maxWidth: 560, px: 2 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            mb: 1.5,
            fontSize: { xs: '2rem', sm: '2.75rem', md: '3.25rem' },
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? `linear-gradient(135deg, ${NFL_COLOR_DARK} 0%, ${NBA_COLOR_DARK} 100%)`
                : `linear-gradient(135deg, ${NFL_COLOR} 0%, ${NBA_COLOR} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Sports Shortcuts
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            fontWeight: 400,
            fontSize: { xs: '1rem', sm: '1.1rem' },
            lineHeight: 1.6,
          }}
        >
          Generate standardized injury and status alerts for NFL and NBA players
        </Typography>
      </Box>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            transition: 'transform 0.2s, box-shadow 0.2s',
            border: (theme) =>
              theme.palette.mode === 'dark'
                ? '1px solid rgba(255,255,255,0.1)'
                : '1px solid rgba(0,0,0,0.08)',
            borderTop: (theme) =>
              `4px solid ${theme.palette.mode === 'dark' ? NFL_COLOR_DARK : NFL_COLOR}`,
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? '0 12px 32px rgba(0,0,0,0.4)'
                  : '0 12px 32px rgba(1, 51, 105, 0.15)',
            },
          }}
        >
          <CardActionArea
            component={Link}
            to="/nfl"
            sx={{
              p: { xs: 3, sm: 4 },
              textAlign: 'center',
              minWidth: 220,
              minHeight: 200,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(74, 144, 217, 0.12)'
                    : 'rgba(1, 51, 105, 0.08)',
                mb: 0.5,
              }}
            >
              <SportsFootballIcon
                sx={{
                  fontSize: '2.25rem',
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? NFL_COLOR_DARK : NFL_COLOR,
                }}
              />
            </Box>
            <Typography
              variant="h5"
              component="h3"
              sx={{
                fontWeight: 600,
                color: (theme) =>
                  theme.palette.mode === 'dark' ? NFL_COLOR_DARK : NFL_COLOR,
              }}
            >
              NFL
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Football status alerts
            </Typography>
          </CardActionArea>
        </Card>

        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            transition: 'transform 0.2s, box-shadow 0.2s',
            border: (theme) =>
              theme.palette.mode === 'dark'
                ? '1px solid rgba(255,255,255,0.1)'
                : '1px solid rgba(0,0,0,0.08)',
            borderTop: (theme) =>
              `4px solid ${theme.palette.mode === 'dark' ? NBA_COLOR_DARK : NBA_COLOR}`,
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? '0 12px 32px rgba(0,0,0,0.4)'
                  : '0 12px 32px rgba(23, 64, 139, 0.15)',
            },
          }}
        >
          <CardActionArea
            component={Link}
            to="/nba"
            sx={{
              p: { xs: 3, sm: 4 },
              textAlign: 'center',
              minWidth: 220,
              minHeight: 200,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(91, 163, 232, 0.12)'
                    : 'rgba(23, 64, 139, 0.08)',
                mb: 0.5,
              }}
            >
              <SportsBasketballIcon
                sx={{
                  fontSize: '2.25rem',
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? NBA_COLOR_DARK : NBA_COLOR,
                }}
              />
            </Box>
            <Typography
              variant="h5"
              component="h3"
              sx={{
                fontWeight: 600,
                color: (theme) =>
                  theme.palette.mode === 'dark' ? NBA_COLOR_DARK : NBA_COLOR,
              }}
            >
              NBA
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Basketball status alerts
            </Typography>
          </CardActionArea>
        </Card>
      </Stack>
    </Stack>
  );
}

export default Home;
