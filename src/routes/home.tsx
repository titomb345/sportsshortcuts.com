import { Box, Card, CardActionArea, Stack, Typography } from '@mui/material';
import { usePageTitle } from '../hooks';
import { Link } from 'react-router-dom';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import BoltIcon from '@mui/icons-material/Bolt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SpeedIcon from '@mui/icons-material/Speed';
import { keyframes } from '@emotion/react';

const NFL_COLOR = '#013369';
const NFL_COLOR_DARK = '#5c9ce6';
const NBA_COLOR = '#17408B';
const NBA_COLOR_DARK = '#6b9fe8';
const NFL_RED = '#d50a0a';

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-12px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export function Home() {
  usePageTitle('Sports Shortcuts - NFL & NBA Injury Status Alert Generator');

  return (
    <Box sx={{ pt: { xs: 4, sm: 6, md: 8 }, pb: { xs: 2, sm: 4 } }}>
      {/* ── Hero ── */}
      <Box
        sx={{
          textAlign: 'center',
          mb: { xs: 6, sm: 8 },
          animation: `${fadeUp} 0.7s ease-out`,
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 0.5,
            mb: 3,
            borderRadius: 10,
            border: (theme) =>
              `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
          }}
        >
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: '#22c55e',
              animation: `${pulse} 2s ease-in-out infinite`,
              boxShadow: '0 0 6px rgba(34,197,94,0.4)',
            }}
          />
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontSize: '0.65rem',
              color: 'text.secondary',
            }}
          >
            Free &amp; Open Source
          </Typography>
        </Box>

        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontFamily: '"Oswald", sans-serif',
            fontWeight: 700,
            fontSize: { xs: '3rem', sm: '4.25rem', md: '5.25rem' },
            lineHeight: 0.92,
            letterSpacing: '-0.01em',
            color: 'text.primary',
            mb: 2.5,
          }}
        >
          STATUS ALERTS
          <br />
          <Box
            component="span"
            sx={{
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? `linear-gradient(135deg, ${NFL_COLOR_DARK} 0%, #e05555 100%)`
                  : `linear-gradient(135deg, ${NFL_COLOR} 0%, ${NFL_RED} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            IN SECONDS
          </Box>
        </Typography>

        <Typography
          sx={{
            color: 'text.secondary',
            fontSize: { xs: '1rem', sm: '1.125rem' },
            maxWidth: 460,
            mx: 'auto',
            lineHeight: 1.65,
            animation: `${fadeUp} 0.7s ease-out 0.12s both`,
          }}
        >
          Generate standardized injury and status updates for NFL and NBA players. Built for
          reporters, analysts, and fans.
        </Typography>
      </Box>

      {/* ── Sport Cards ── */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2.5}
        sx={{
          mb: { xs: 6, sm: 8 },
          animation: `${fadeUp} 0.7s ease-out 0.25s both`,
        }}
      >
        {/* NFL */}
        <SportCard
          to="/nfl"
          label="NFL"
          description="Football injury & status alerts"
          icon={<SportsFootballIcon sx={{ fontSize: '1.75rem' }} />}
          lightColor={NFL_COLOR}
          darkColor={NFL_COLOR_DARK}
          lightRgb="1, 51, 105"
          darkRgb="92, 156, 230"
        />

        {/* NBA */}
        <SportCard
          to="/nba"
          label="NBA"
          description="Basketball injury & status alerts"
          icon={<SportsBasketballIcon sx={{ fontSize: '1.75rem' }} />}
          lightColor={NBA_COLOR}
          darkColor={NBA_COLOR_DARK}
          lightRgb="23, 64, 139"
          darkRgb="107, 159, 232"
        />
      </Stack>

      {/* ── Features ── */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 2, sm: 2.5 }}
        sx={{
          mb: { xs: 6, sm: 8 },
          animation: `${fadeUp} 0.7s ease-out 0.4s both`,
        }}
      >
        {[
          {
            icon: <BoltIcon sx={{ fontSize: '1.2rem' }} />,
            title: 'Instant Generation',
            desc: 'Type a name, get formatted alerts',
          },
          {
            icon: <ContentCopyIcon sx={{ fontSize: '1.05rem' }} />,
            title: 'One-Click Copy',
            desc: 'Copy any alert to your clipboard',
          },
          {
            icon: <SpeedIcon sx={{ fontSize: '1.2rem' }} />,
            title: 'Built for Speed',
            desc: 'Designed for breaking news workflows',
          },
        ].map((feature) => (
          <Stack
            key={feature.title}
            direction="row"
            spacing={1.5}
            alignItems="flex-start"
            sx={{
              flex: 1,
              p: 2,
              borderRadius: 3,
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.025)'
                  : 'rgba(0,0,0,0.018)',
              border: (theme) =>
                `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
            }}
          >
            <Box sx={{ color: 'text.disabled', mt: 0.25, flexShrink: 0 }}>{feature.icon}</Box>
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: 'text.primary', mb: 0.25 }}
              >
                {feature.title}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.45 }}>
                {feature.desc}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>

      {/* ── Example Output ── */}
      <Box
        sx={{
          textAlign: 'center',
          animation: `${fadeUp} 0.7s ease-out 0.55s both`,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: 'text.disabled',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 600,
            fontSize: '0.625rem',
            mb: 1.5,
            display: 'block',
          }}
        >
          Example Output
        </Typography>
        <Box
          sx={{
            display: 'inline-block',
            px: 3,
            py: 1.5,
            borderRadius: 2,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.025)',
            border: (theme) =>
              `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
            borderLeft: (theme) =>
              `3px solid ${theme.palette.mode === 'dark' ? NFL_COLOR_DARK : NFL_COLOR}`,
            animation: `${slideIn} 0.5s ease-out 0.7s both`,
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Roboto Mono", monospace',
              fontSize: { xs: '0.78rem', sm: '0.875rem' },
              color: 'text.secondary',
            }}
          >
            Status alert: Patrick Mahomes (ankle) questionable to return Sunday.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

/* ── Sport Card ── */

type SportCardProps = {
  to: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  lightColor: string;
  darkColor: string;
  lightRgb: string;
  darkRgb: string;
};

function SportCard({
  to,
  label,
  description,
  icon,
  lightColor,
  darkColor,
  lightRgb,
  darkRgb,
}: SportCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        flex: 1,
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        border: (theme) =>
          `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? `0 20px 40px -12px rgba(${darkRgb}, 0.2)`
              : `0 20px 40px -12px rgba(${lightRgb}, 0.25)`,
          '& .card-arrow': {
            transform: 'translateX(4px)',
            opacity: 1,
          },
          '& .card-stripe': {
            opacity: 1,
          },
        },
      }}
    >
      {/* Diagonal stripe accent */}
      <Box
        className="card-stripe"
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '35%',
          height: '100%',
          opacity: 0.5,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? `repeating-linear-gradient(-55deg, transparent, transparent 7px, rgba(${darkRgb}, 0.04) 7px, rgba(${darkRgb}, 0.04) 8px)`
              : `repeating-linear-gradient(-55deg, transparent, transparent 7px, rgba(${lightRgb}, 0.035) 7px, rgba(${lightRgb}, 0.035) 8px)`,
        }}
      />

      <CardActionArea
        component={Link}
        to={to}
        sx={{
          p: { xs: 3, sm: 3.5 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2.5}>
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? `rgba(${darkRgb}, 0.12)`
                    : lightColor,
                color: (theme) => (theme.palette.mode === 'dark' ? darkColor : '#ffffff'),
                flexShrink: 0,
              }}
            >
              {icon}
            </Box>
            <Box>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontFamily: '"Oswald", sans-serif',
                  fontWeight: 700,
                  fontSize: { xs: '1.5rem', sm: '1.65rem' },
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? darkColor : lightColor,
                  lineHeight: 1.1,
                }}
              >
                {label}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  mt: 0.25,
                  fontSize: '0.85rem',
                }}
              >
                {description}
              </Typography>
            </Box>
          </Stack>
          <ArrowForwardIcon
            className="card-arrow"
            sx={{
              color: 'text.disabled',
              opacity: 0.5,
              transition: 'all 0.3s ease',
              display: { xs: 'none', sm: 'block' },
            }}
          />
        </Stack>
      </CardActionArea>
    </Card>
  );
}

export default Home;
