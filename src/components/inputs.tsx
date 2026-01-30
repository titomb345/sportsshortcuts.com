import { useMemo } from 'react';
import {
  Autocomplete,
  FormControl,
  Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Fuse from 'fuse.js';
import { DayOfWeek } from '../types';
import { Player } from '../data/types';

type InputsProps = {
  playerName: string;
  setPlayerName: (name: string) => void;
  injury: string;
  setInjury: (injury: string) => void;
  dayOfWeek: DayOfWeek;
  setDayOfWeek: (day: DayOfWeek) => void;
  mascot?: string;
  setMascot?: (mascot: string) => void;
  players?: Player[];
};

const normalize = (str: string) => str.replace(/[.''-]/g, '');

const inputSx = {
  '& .MuiInputLabel-root': {
    fontWeight: 500,
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    transition: 'all 0.2s ease-in-out',
  },
};

export function Inputs({
  playerName,
  setPlayerName,
  injury,
  setInjury,
  dayOfWeek,
  setDayOfWeek,
  mascot,
  setMascot,
  players = [],
}: InputsProps) {
  const showMascot = Boolean(setMascot);
  const gridSize = showMascot ? 3 : 4;

  const fuse = useMemo(
    () =>
      new Fuse(players, {
        keys: ['name'],
        threshold: 0.2,
        ignoreLocation: true,
        getFn: (obj, path) => {
          const value = Fuse.config.getFn(obj, path);
          if (typeof value === 'string') {
            return normalize(value);
          }
          return value;
        },
      }),
    [players]
  );

  const filterOptions = (
    options: Player[],
    { inputValue }: { inputValue: string }
  ) => {
    const trimmed = inputValue.trim();
    if (!trimmed) return options.slice(0, 50);

    return fuse
      .search(normalize(trimmed), { limit: 50 })
      .map((result) => result.item);
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: gridSize }}>
        <FormControl fullWidth>
          <Autocomplete
            freeSolo
            options={players}
            getOptionLabel={(option) =>
              typeof option === 'string' ? option : option.name
            }
            renderOption={(props, option) => (
              <li {...props} key={`${option.name}-${option.team}`}>
                {option.name} ({option.team})
              </li>
            )}
            filterOptions={filterOptions}
            inputValue={playerName}
            onInputChange={(_, value) => setPlayerName(value)}
            onChange={(_, value) => {
              if (value && typeof value !== 'string' && setMascot) {
                setMascot(value.team);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Player name (required)"
                size="small"
                sx={inputSx}
              />
            )}
          />
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: gridSize }}>
        <FormControl fullWidth>
          <TextField
            label="Injury"
            value={injury}
            size="small"
            sx={inputSx}
            onChange={(injury) => setInjury(injury.target.value)}
          />
        </FormControl>
      </Grid>
      {showMascot && (
        <Grid size={{ xs: 12, sm: 6, md: gridSize }}>
          <FormControl fullWidth>
            <TextField
              label="Mascot"
              value={mascot}
              size="small"
              sx={inputSx}
              onChange={(mascot) => setMascot?.(mascot.target.value)}
            />
          </FormControl>
        </Grid>
      )}
      <Grid size={{ xs: 12, sm: 6, md: gridSize }}>
        <FormControl fullWidth>
          <InputLabel id="day-of-week-label" sx={{ fontWeight: 500 }}>
            Day of Week
          </InputLabel>
          <Select
            labelId="day-of-week-label"
            value={dayOfWeek}
            label="Day of week"
            size="small"
            onChange={(day) => setDayOfWeek(day.target.value as DayOfWeek)}
            sx={{
              borderRadius: 2,
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <MenuItem value="Sunday">Sunday</MenuItem>
            <MenuItem value="Monday">Monday</MenuItem>
            <MenuItem value="Tuesday">Tuesday</MenuItem>
            <MenuItem value="Wednesday">Wednesday</MenuItem>
            <MenuItem value="Thursday">Thursday</MenuItem>
            <MenuItem value="Friday">Friday</MenuItem>
            <MenuItem value="Saturday">Saturday</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default Inputs;
