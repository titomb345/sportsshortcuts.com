import { Box, Container } from '@mui/material';
import Header from './header';
import Footer from './footer';
import { InputsContextWrapper } from '../inputs-context-wrapper';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      sx={{
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '300px',
          background: (theme) =>
            `linear-gradient(180deg, ${theme.palette.primary.main}15 0%, transparent 100%)`,
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      <Header />
      <InputsContextWrapper>
        <Container component="main" maxWidth="md" sx={{ py: { xs: 3, sm: 4 }, flex: 1, position: 'relative', zIndex: 1 }}>{children}</Container>
      </InputsContextWrapper>
      <Footer />
    </Box>
  );
}
