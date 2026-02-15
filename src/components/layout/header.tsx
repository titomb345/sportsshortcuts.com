import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import BoltIcon from '@mui/icons-material/Bolt';
import { useColorMode } from '../../theme';

const pages = [
  { name: 'NFL', path: '/nfl', icon: <SportsFootballIcon sx={{ mr: 0.5 }} fontSize="small" /> },
  { name: 'NBA', path: '/nba', icon: <SportsBasketballIcon sx={{ mr: 0.5 }} fontSize="small" /> },
];

export function Header() {
  const location = useLocation();
  const { mode, toggleColorMode } = useColorMode();

  return (
    <AppBar position="sticky" elevation={0} sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: { xs: 56, sm: 64 } }}>
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': {
                opacity: 0.9,
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                borderRadius: 1.5,
                backgroundColor: 'rgba(255,255,255,0.15)',
              }}
            >
              <BoltIcon sx={{ fontSize: '1.25rem' }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Oswald", sans-serif',
                fontWeight: 700,
                letterSpacing: '0.05em',
                fontSize: { xs: '1rem', sm: '1.25rem' },
              }}
            >
              SPORTS SHORTCUTS
            </Typography>
          </Box>
          <Box component="nav" aria-label="Sport selection" sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {pages.map((page) => {
              const isActive = location.pathname.startsWith(page.path);
              return (
                <Button
                  key={page.name}
                  component={Link}
                  to={page.path}
                  size="small"
                  sx={{
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    px: { xs: 1.5, sm: 2 },
                    py: 0.75,
                    borderRadius: 2,
                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    transition: 'all 0.2s ease-in-out',
                    '&::after': isActive
                      ? {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: '20%',
                          right: '20%',
                          height: '2px',
                          backgroundColor: 'white',
                          borderRadius: '2px 2px 0 0',
                        }
                      : {},
                  }}
                >
                  {page.icon}
                  {page.name}
                </Button>
              );
            })}
            <IconButton
              onClick={toggleColorMode}
              size="small"
              aria-label={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              sx={{
                color: 'white',
                ml: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
