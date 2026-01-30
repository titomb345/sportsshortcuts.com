import { Box, Container, Typography, useTheme } from '@mui/material';

export function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: (theme) => `${theme.palette.primary.main}08`,
        py: 2,
        mt: 'auto',
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            color: 'text.secondary',
          }}
        >
          &copy; {new Date().getFullYear()} Bill Bergquist
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
