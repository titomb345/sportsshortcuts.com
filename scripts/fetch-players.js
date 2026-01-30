#!/usr/bin/env node

/**
 * Fetches current NBA and NFL players by scraping ESPN team rosters
 * and outputs to src/data/players.json
 *
 * Usage: npm run fetch-players
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NBA_TEAMS = [
  { slug: 'atl/atlanta-hawks', name: 'Hawks' },
  { slug: 'bos/boston-celtics', name: 'Celtics' },
  { slug: 'bkn/brooklyn-nets', name: 'Nets' },
  { slug: 'cha/charlotte-hornets', name: 'Hornets' },
  { slug: 'chi/chicago-bulls', name: 'Bulls' },
  { slug: 'cle/cleveland-cavaliers', name: 'Cavaliers' },
  { slug: 'dal/dallas-mavericks', name: 'Mavericks' },
  { slug: 'den/denver-nuggets', name: 'Nuggets' },
  { slug: 'det/detroit-pistons', name: 'Pistons' },
  { slug: 'gs/golden-state-warriors', name: 'Warriors' },
  { slug: 'hou/houston-rockets', name: 'Rockets' },
  { slug: 'ind/indiana-pacers', name: 'Pacers' },
  { slug: 'lac/la-clippers', name: 'Clippers' },
  { slug: 'lal/los-angeles-lakers', name: 'Lakers' },
  { slug: 'mem/memphis-grizzlies', name: 'Grizzlies' },
  { slug: 'mia/miami-heat', name: 'Heat' },
  { slug: 'mil/milwaukee-bucks', name: 'Bucks' },
  { slug: 'min/minnesota-timberwolves', name: 'Timberwolves' },
  { slug: 'no/new-orleans-pelicans', name: 'Pelicans' },
  { slug: 'ny/new-york-knicks', name: 'Knicks' },
  { slug: 'okc/oklahoma-city-thunder', name: 'Thunder' },
  { slug: 'orl/orlando-magic', name: 'Magic' },
  { slug: 'phi/philadelphia-76ers', name: '76ers' },
  { slug: 'phx/phoenix-suns', name: 'Suns' },
  { slug: 'por/portland-trail-blazers', name: 'Trail Blazers' },
  { slug: 'sac/sacramento-kings', name: 'Kings' },
  { slug: 'sa/san-antonio-spurs', name: 'Spurs' },
  { slug: 'tor/toronto-raptors', name: 'Raptors' },
  { slug: 'utah/utah-jazz', name: 'Jazz' },
  { slug: 'wsh/washington-wizards', name: 'Wizards' },
];

const NFL_TEAMS = [
  { slug: 'ari/arizona-cardinals', name: 'Cardinals' },
  { slug: 'atl/atlanta-falcons', name: 'Falcons' },
  { slug: 'bal/baltimore-ravens', name: 'Ravens' },
  { slug: 'buf/buffalo-bills', name: 'Bills' },
  { slug: 'car/carolina-panthers', name: 'Panthers' },
  { slug: 'chi/chicago-bears', name: 'Bears' },
  { slug: 'cin/cincinnati-bengals', name: 'Bengals' },
  { slug: 'cle/cleveland-browns', name: 'Browns' },
  { slug: 'dal/dallas-cowboys', name: 'Cowboys' },
  { slug: 'den/denver-broncos', name: 'Broncos' },
  { slug: 'det/detroit-lions', name: 'Lions' },
  { slug: 'gb/green-bay-packers', name: 'Packers' },
  { slug: 'hou/houston-texans', name: 'Texans' },
  { slug: 'ind/indianapolis-colts', name: 'Colts' },
  { slug: 'jax/jacksonville-jaguars', name: 'Jaguars' },
  { slug: 'kc/kansas-city-chiefs', name: 'Chiefs' },
  { slug: 'lv/las-vegas-raiders', name: 'Raiders' },
  { slug: 'lac/los-angeles-chargers', name: 'Chargers' },
  { slug: 'lar/los-angeles-rams', name: 'Rams' },
  { slug: 'mia/miami-dolphins', name: 'Dolphins' },
  { slug: 'min/minnesota-vikings', name: 'Vikings' },
  { slug: 'ne/new-england-patriots', name: 'Patriots' },
  { slug: 'no/new-orleans-saints', name: 'Saints' },
  { slug: 'nyg/new-york-giants', name: 'Giants' },
  { slug: 'nyj/new-york-jets', name: 'Jets' },
  { slug: 'phi/philadelphia-eagles', name: 'Eagles' },
  { slug: 'pit/pittsburgh-steelers', name: 'Steelers' },
  { slug: 'sf/san-francisco-49ers', name: '49ers' },
  { slug: 'sea/seattle-seahawks', name: 'Seahawks' },
  { slug: 'tb/tampa-bay-buccaneers', name: 'Buccaneers' },
  { slug: 'ten/tennessee-titans', name: 'Titans' },
  { slug: 'wsh/washington-commanders', name: 'Commanders' },
];

async function fetchWithRetry(url, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.text();
      }
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 1000 * attempt));
      }
    } catch (err) {
      if (attempt === maxRetries) throw err;
      await new Promise((r) => setTimeout(r, 1000 * attempt));
    }
  }
  throw new Error(`Failed to fetch ${url}`);
}

function extractPlayerNames(html, sport) {
  const names = new Set();

  // ESPN embeds JSON data with properly capitalized names
  // Player entries have: "name":"Player Name","href":"...espn.com/nba/player/..." or nfl/player
  const playerPattern = new RegExp(
    `"name":"([^"]+)","href":"https://www\\.espn\\.com/${sport}/player/`,
    'g'
  );

  let match;
  while ((match = playerPattern.exec(html)) !== null) {
    names.add(match[1]);
  }

  return names;
}

async function fetchRosters(teams, sport) {
  const players = [];
  const baseUrl =
    sport === 'nba'
      ? 'https://www.espn.com/nba/team/roster/_/name/'
      : 'https://www.espn.com/nfl/team/roster/_/name/';

  for (let i = 0; i < teams.length; i++) {
    const team = teams[i];
    const url = baseUrl + team.slug;

    try {
      process.stdout.write(`  ${team.name}... `);
      const html = await fetchWithRetry(url);
      const names = extractPlayerNames(html, sport);

      for (const name of names) {
        players.push({ name, team: team.name });
      }

      console.log(`${names.size} players`);

      // Small delay to be nice to ESPN
      if (i < teams.length - 1) {
        await new Promise((r) => setTimeout(r, 300));
      }
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
    }
  }

  return players;
}

async function main() {
  console.log('Fetching current NBA rosters from ESPN...\n');
  const nbaPlayers = await fetchRosters(NBA_TEAMS, 'nba');

  console.log('\nFetching current NFL rosters from ESPN...\n');
  const nflPlayers = await fetchRosters(NFL_TEAMS, 'nfl');

  // Sort alphabetically
  nbaPlayers.sort((a, b) => a.name.localeCompare(b.name));
  nflPlayers.sort((a, b) => a.name.localeCompare(b.name));

  const data = {
    nba: nbaPlayers,
    nfl: nflPlayers,
  };

  const outputPath = path.join(__dirname, '..', 'src', 'data', 'players.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`\nSuccess! Wrote ${nbaPlayers.length} NBA and ${nflPlayers.length} NFL players`);
  console.log(`Output: src/data/players.json`);
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
