# Sports Shortcuts

A Progressive Web App that generates standardized sports injury and status alert messages for NFL and NBA games. Built for sports reporters, social media managers, and content creators who need to quickly generate consistent player status updates.

## Features

### NFL Generator
Generate status updates for NFL games with customizable templates including:
- Locker room updates (headed to, carted to, remains in)
- Return status (questionable, won't return, will return, has returned)
- Medical tent updates
- Concussion evaluations
- Player autocomplete with searchable roster data
- Sport-branded NFL theming with gradient design

### NBA Generator
Generate status updates for NBA games with expanded templates including:
- Locker room updates (headed to, helped to, carted to, stretchered to)
- Return status (available, probable, questionable, doubtful, won't return)
- Half-time updates
- Ejection notices (Flagrant 1, Flagrant 2, technical fouls)
- Team mascot integration for bench returns
- Player autocomplete with searchable roster data
- Sport-branded NBA theming with gradient design

### Core Functionality
- Player autocomplete with NFL and NBA rosters (1000+ players)
- Auto-populated team mascot when selecting NBA players
- One-click copy to clipboard for all generated messages
- Real-time message generation as you type
- Persistent state across navigation with React Context
- Dark mode support with theme toggle
- Sport-specific themes (NFL blue, NBA orange/blue)
- Responsive Material-UI design
- PWA support for offline access and mobile installation
- Footer with social links (GitHub, LinkedIn, Buy Me a Coffee)

## Technology Stack

- **Framework:** React 18 with TypeScript
- **UI Library:** Material-UI (MUI) v6
- **Routing:** React Router v6
- **State Management:** React Context API
- **Build Tool:** Vite
- **PWA:** vite-plugin-pwa with Workbox
- **Utilities:** react-copy-to-clipboard, react-document-title
- **Deployment:** Netlify

## Project Structure

```
src/
├── components/
│   ├── inputs.tsx                 # Autocomplete player input with injury/day fields
│   ├── inputs-context.ts          # Context for managing input state
│   ├── inputs-context-wrapper.tsx # Context provider wrapper
│   ├── status-update.tsx          # Status message card with copy button
│   └── layout/                    # Header with dark mode toggle, footer with links
├── routes/
│   ├── home.tsx                   # Landing page with sport selection
│   ├── error.tsx                  # 404 error page
│   ├── nfl/
│   │   ├── nfl-generator.tsx      # NFL generator page
│   │   └── generations.tsx        # NFL message templates
│   └── nba/
│       ├── nba-generator.tsx      # NBA generator page
│       └── generations.tsx        # NBA message templates
├── data/
│   ├── players.json               # NFL and NBA player roster data
│   └── types.ts                   # Player data types
├── theme/
│   ├── ThemeProvider.tsx          # Theme provider with dark mode support
│   ├── create-sport-theme.ts      # Sport theme factory with light/dark modes
│   ├── nfl-theme.ts               # NFL-specific theme configuration
│   ├── nba-theme.ts               # NBA-specific theme configuration
│   └── base.ts                    # Base theme options
├── hooks/
│   ├── use-page-title.ts          # Dynamic page title hook
│   └── use-show-generations.tsx   # Conditional rendering hook
├── utils/
│   ├── date.ts                    # Date utilities
│   └── text.ts                    # Text formatting utilities
└── types.ts                       # TypeScript type definitions
```

## Installation

```bash
npm install
```

## Development

Start the development server:

```bash
npm start
```

The app will be available at [http://localhost:5174](http://localhost:5174).

Alternative command:
```bash
npm run dev
```

## Production Build

Build the app for production:

```bash
npm run build
```

The optimized build will be created in the `dist/` folder with TypeScript compilation and PWA service worker generation.

Preview the production build locally:

```bash
npm run preview
```

## Scripts

- `npm start` - Start Vite development server on port 5174
- `npm run dev` - Alias for `npm start`
- `npm run build` - TypeScript compilation and production build
- `npm run preview` - Preview production build locally
- `npm run fetch-players` - Scrape ESPN rosters to update player data

## How to Use

1. Navigate to either `/nfl` or `/nba` using the navigation menu or landing page
2. Enter the required information:
   - **Player name** (required): Start typing to search from 1000+ NFL/NBA players, or enter any name
   - **Injury** (optional): Type of injury (e.g., "knee", "ankle")
   - **Day of Week**: The day the game is taking place (Sunday, Monday, etc.)
   - **Mascot** (NBA only, optional): Auto-populated when selecting from player list
3. View the generated status messages below the form
4. Click the copy icon next to any message to copy it to your clipboard
5. Toggle dark mode using the moon/sun icon in the header

### Example Output

**NFL:**
```
Status alert: Patrick Mahomes (ankle) questionable to return Sunday.
```

**NBA:**
```
Status alert: LeBron James (knee) headed to locker room Wednesday.
```

## Player Data

The app includes current NFL and NBA rosters scraped from ESPN. To update player data:

```bash
npm run fetch-players
```

This script scrapes all NFL and NBA team rosters and writes to `/Users/bill/Projects/sportsshortcuts.com/src/data/players.json`.

Player data format:
```typescript
{
  "nfl": [{ "name": "Player Name", "team": "Team Name" }],
  "nba": [{ "name": "Player Name", "team": "Team Mascot" }]
}
```

## PWA Configuration

The app is configured as a Progressive Web App with:
- Service worker for offline support
- Web manifest at `/public/manifest.json`
- Custom favicon and app icons (192x192, 512x512, apple-touch-icon)
- Auto-update strategy using Workbox

Users can install the app on mobile devices or desktop for native-like experience.

## Deployment

The app is deployed on Netlify with configuration in `netlify.toml`:
- Build command: `npm run build`
- Publish directory: `dist`
- SPA routing handled with redirect rules

## Dark Mode

Dark mode is supported across all pages with:
- Toggle in header navigation
- Persistent preference saved to localStorage
- Sport-specific dark themes for NFL and NBA
- Automatic theme switching based on current route

## Code Formatting

This project uses Prettier for code formatting. Configuration is in `.prettierrc.json`.

## TypeScript Configuration

- Strict mode enabled
- Target: ES2020
- Module resolution: bundler
- Full type safety with no unused locals or parameters

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge). PWA features require browsers with service worker support.

## Author

Bill Bergquist
- GitHub: [@titomb345](https://github.com/titomb345)
- LinkedIn: [bill-bergquist](https://linkedin.com/in/bill-bergquist)
- Buy Me a Coffee: [@titomb345](https://buymeacoffee.com/titomb355)

## License

This is a personal project.
