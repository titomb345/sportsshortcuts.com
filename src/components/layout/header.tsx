import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

const pages = [
  { name: 'NFL', path: '/nfl', icon: <SportsFootballIcon sx={{ mr: 0.5 }} fontSize="small" /> },
  { name: 'NBA', path: '/nba', icon: <SportsBasketballIcon sx={{ mr: 0.5 }} fontSize="small" /> },
];

export function Header() {
  const location = useLocation();

  return (
    <AppBar position="sticky" elevation={4}>
      <Container>
        <Toolbar disableGutters variant="dense" sx={{ justifyContent: 'space-between' }}>
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': {
                opacity: 0.9,
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Oswald", sans-serif',
                fontWeight: 700,
                letterSpacing: '0.05em',
                fontSize: '1.25rem',
              }}
            >
              SPORTS SHORTCUTS
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
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
                    px: 2,
                    py: 0.75,
                    borderRadius: 2,
                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
