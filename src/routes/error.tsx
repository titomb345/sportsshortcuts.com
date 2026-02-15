import { Box, Button, Stack, Typography } from '@mui/material';
import { usePageTitle } from '../hooks';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

export function Error() {
  usePageTitle('Page Not Found - Sports Shortcuts');

  return (
    <Stack spacing={3} alignItems="center" sx={{ pt: { xs: 8, sm: 12 }, textAlign: 'center' }}>
      <Typography
        variant="h1"
        sx={{
          fontWeight: 700,
          fontSize: { xs: '4rem', sm: '6rem' },
          color: 'text.disabled',
          lineHeight: 1,
        }}
      >
        404
      </Typography>
      <Typography variant="h5" sx={{ color: 'text.secondary', fontWeight: 500 }}>
        Page not found
      </Typography>
      <Box sx={{ pt: 2 }}>
        <Button
          component={Link}
          to="/"
          variant="outlined"
          startIcon={<HomeIcon />}
          size="large"
        >
          Back to home
        </Button>
      </Box>
    </Stack>
  );
}

export default Error;
