import { DayOfWeek } from '../types';
import { Card, IconButton, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { keyframes } from '@emotion/react';

const COPIED_FADE = 3000;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
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
};

export function StatusUpdate({
  playerName,
  injury,
  dayOfWeek,
  middleSlug,
  endSlug = '',
}: TweetProps) {
  const [showCopy, setShowCopy] = useState<boolean>(true);

  const text = useMemo(() => {
    let text = `Status alert: ${playerName.trim()}`;

    if (injury) {
      text += ` (${injury.trim()})`;
    }

    text += ` ${middleSlug} ${dayOfWeek}${endSlug}.`;

    return text;
  }, [playerName, injury, middleSlug, dayOfWeek, endSlug]);

  const handleCopy = async () => {
    setShowCopy(false);

    setTimeout(() => {
      setShowCopy(true);
    }, COPIED_FADE);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        animation: `${fadeIn} 0.3s ease-out`,
        transition: 'all 0.2s ease-in-out',
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        minHeight={30}
        py={1.5}
        px={2}
        spacing={2}
      >
        <Typography
          sx={{
            fontFamily: '"Roboto Mono", monospace',
            fontSize: '0.9rem',
          }}
        >
          {text}
        </Typography>
        <CopyToClipboard text={text} onCopy={handleCopy}>
          <IconButton
            size="small"
            disabled={!showCopy}
            sx={{
              transition: 'all 0.2s ease-in-out',
              ...(showCopy
                ? {
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      transform: 'scale(1.1)',
                    },
                  }
                : {
                    backgroundColor: 'success.main',
                    color: 'white',
                    '&.Mui-disabled': {
                      backgroundColor: 'success.main',
                      color: 'white',
                    },
                  }),
            }}
          >
            {showCopy ? <ContentCopyIcon fontSize="small" /> : <CheckIcon fontSize="small" />}
          </IconButton>
        </CopyToClipboard>
      </Stack>
    </Card>
  );
}

export default StatusUpdate;
