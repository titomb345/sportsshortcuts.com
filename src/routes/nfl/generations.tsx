import { DayOfWeek } from '../../types';
import { Box, Stack, Typography } from '@mui/material';
import StatusUpdate from '../../components/status-update';

type GenerationsProps = {
  playerName: string;
  injury: string;
  dayOfWeek: DayOfWeek;
};

const TEMPLATES = [
  { middleSlug: 'headed to locker room' },
  { middleSlug: 'headed to medical tent' },
  { middleSlug: 'carted to locker room' },
  { middleSlug: 'questionable to return' },
  { middleSlug: 'remains in locker room' },
  { middleSlug: "won't return" },
  { middleSlug: 'will return' },
  { middleSlug: 'has returned to', endSlug: "'s game" },
  { middleSlug: 'unlikely to return' },
  { middleSlug: 'being evaluated for concussion', noInjury: true },
] as const;

export function Generations({ playerName, injury, dayOfWeek }: GenerationsProps) {
  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 1.5 }}
      >
        <Typography
          variant="caption"
          sx={{
            color: 'text.disabled',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 600,
            fontSize: '0.65rem',
          }}
        >
          Generated Alerts
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: 'text.disabled',
            fontSize: '0.75rem',
            fontWeight: 500,
          }}
        >
          {TEMPLATES.length} templates
        </Typography>
      </Stack>
      <Stack spacing={1}>
        {TEMPLATES.map((t, i) => (
          <StatusUpdate
            key={t.middleSlug}
            playerName={playerName}
            injury={'noInjury' in t ? undefined : injury}
            dayOfWeek={dayOfWeek}
            middleSlug={t.middleSlug}
            endSlug={'endSlug' in t ? t.endSlug : undefined}
            index={i}
          />
        ))}
      </Stack>
    </Box>
  );
}

export default Generations;
