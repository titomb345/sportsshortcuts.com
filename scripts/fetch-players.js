#!/usr/bin/env node

/**
 * Fetches all NBA and NFL players from BALLDONTLIE API
 * and outputs to src/data/players.json
 *
 * Usage: node scripts/fetch-players.js <API_KEY>
 * Or set BALLDONTLIE_API_KEY environment variable
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = process.argv[2] || process.env.BALLDONTLIE_API_KEY;

if (!API_KEY) {
  console.error('Error: API key required');
  console.error('Usage: node scripts/fetch-players.js <API_KEY>');
  console.error('Or set BALLDONTLIE_API_KEY environment variable');
  process.exit(1);
}

const HEADERS = {
  Authorization: API_KEY,
};

const outputPath = path.join(__dirname, '..', 'src', 'data', 'players.json');
const progressPath = path.join(__dirname, '..', 'src', 'data', '.fetch-progress.json');

function loadProgress() {
  try {
    if (fs.existsSync(progressPath)) {
      return JSON.parse(fs.readFileSync(progressPath, 'utf8'));
    }
  } catch {
    // Ignore errors, start fresh
  }
  return { nba: [], nfl: [], nbaCursor: null, nflCursor: null, nbaComplete: false, nflComplete: false };
}

function saveProgress(progress) {
  fs.writeFileSync(progressPath, JSON.stringify(progress, null, 2));
}

async function fetchWithRetry(url, maxRetries = 10) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const response = await fetch(url, { headers: HEADERS });

    if (response.ok) {
      return response;
    }

    if (response.status === 429) {
      // Much longer backoff - API seems to have per-minute limits
      const waitTime = Math.min(Math.pow(2, attempt) * 2000, 120000);
      console.log(`  Rate limited, waiting ${waitTime / 1000}s (attempt ${attempt}/${maxRetries})...`);
      await new Promise((resolve) => setTimeout(resolve, waitTime));
      continue;
    }

    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  throw new Error('Max retries exceeded');
}

async function fetchAllPages(baseUrl, sport, progress) {
  const players = progress[sport] || [];
  let cursor = progress[`${sport}Cursor`];
  let page = Math.floor(players.length / 100) + 1;

  if (progress[`${sport}Complete`]) {
    console.log(`${sport.toUpperCase()} already complete (${players.length} players)`);
    return players;
  }

  console.log(`Fetching ${sport.toUpperCase()} players${cursor ? ' (resuming)' : ''}...`);
  if (players.length > 0) {
    console.log(`  Resuming from ${players.length} players`);
  }

  while (true) {
    const url = new URL(baseUrl);
    url.searchParams.set('per_page', '100');
    if (cursor) {
      url.searchParams.set('cursor', cursor);
    }

    const response = await fetchWithRetry(url.toString());
    const data = await response.json();

    for (const player of data.data) {
      players.push({
        id: player.id,
        name: `${player.first_name} ${player.last_name}`,
        team: player.team?.name || 'Free Agent',
        position: player.position || 'N/A',
      });
    }

    console.log(`  Page ${page}: fetched ${data.data.length} players (total: ${players.length})`);

    // Save progress after each page
    progress[sport] = players;
    progress[`${sport}Cursor`] = data.meta?.next_cursor || null;
    saveProgress(progress);

    if (!data.meta?.next_cursor) {
      progress[`${sport}Complete`] = true;
      saveProgress(progress);
      break;
    }

    cursor = data.meta.next_cursor;
    page++;

    // Wait 2 seconds between requests to stay well under rate limits
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return players;
}

async function main() {
  try {
    const progress = loadProgress();

    // Fetch sequentially to avoid rate limits
    const nbaPlayers = await fetchAllPages('https://api.balldontlie.io/v1/players', 'nba', progress);
    const nflPlayers = await fetchAllPages('https://api.balldontlie.io/nfl/v1/players', 'nfl', progress);

    // Sort players alphabetically by name
    nbaPlayers.sort((a, b) => a.name.localeCompare(b.name));
    nflPlayers.sort((a, b) => a.name.localeCompare(b.name));

    const data = {
      nba: nbaPlayers,
      nfl: nflPlayers,
    };

    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

    // Clean up progress file
    if (fs.existsSync(progressPath)) {
      fs.unlinkSync(progressPath);
    }

    console.log(`\nSuccess! Wrote ${nbaPlayers.length} NBA and ${nflPlayers.length} NFL players to src/data/players.json`);
  } catch (error) {
    console.error('Error fetching players:', error.message);
    console.error('Progress saved. Run again to resume.');
    process.exit(1);
  }
}

main();
