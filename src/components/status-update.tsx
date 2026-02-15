import { DayOfWeek } from '../types';
import { Card, CardActionArea, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { keyframes } from '@emotion/react';

const COPIED_FADE = 3000;
const STAGGER_MS = 40;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

type TweetProps = {
  playerName: string;
  injury?: string;
  dayOfWeek: DayOfWeek;
  middleSlug: string;
  endSlug?: string;
  index?: number;
};

export function StatusUpdate({
  playerName,
  injury,
  dayOfWeek,
  middleSlug,
  endSlug = '',
  index = 0,
}: TweetProps) {
  const [copied, setCopied] = useState(false);

  const text = useMemo(() => {
    let text = `Status alert: ${playerName.trim()}`;

    if (injury) {
      text += ` (${injury.trim()})`;
    }

    text += ` ${middleSlug} ${dayOfWeek}${endSlug}.`;

    return text;
  }, [playerName, injury, middleSlug, dayOfWeek, endSlug]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), COPIED_FADE);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        animation: `${fadeIn} 0.35s ease-out ${index * STAGGER_MS}ms both`,
        transition: 'all 0.2s ease-in-out',
        borderLeft: '3px solid',
        borderLeftColor: copied ? 'success.main' : 'primary.main',
        '&:hover': {
          borderColor: 'divider',
          borderLeftColor: copied ? 'success.main' : 'primary.main',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(255,255,255,0.02)'
              : 'rgba(0,0,0,0.012)',
        },
      }}
    >
      <CardActionArea
        onClick={handleCopy}
        sx={{ py: 1.5, px: 2.5 }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography
            sx={{
              fontFamily: '"Roboto Mono", monospace',
              fontSize: '0.9rem',
              flex: 1,
            }}
          >
            {text}
          </Typography>
          {copied ? (
            <CheckIcon
              fontSize="small"
              sx={{ color: 'success.main', flexShrink: 0 }}
            />
          ) : (
            <ContentCopyIcon
              fontSize="small"
              sx={{ color: 'text.disabled', flexShrink: 0 }}
            />
          )}
        </Stack>
      </CardActionArea>
    </Card>
  );
}

export default StatusUpdate;
