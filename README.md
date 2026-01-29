# Sports Shortcuts

A web application that generates standardized sports injury and status alert messages for NFL and NBA games. Built for sports reporters, social media managers, and content creators who need to quickly generate consistent player status updates.

## Features

### NFL Generator
Generate status updates for NFL games with customizable templates including:
- Locker room updates (headed to, carted to, remains in)
- Return status (questionable, won't return, will return, has returned)
- Medical tent updates
- Concussion evaluations

### NBA Generator
Generate status updates for NBA games with expanded templates including:
- Locker room updates (headed to, helped to, carted to, stretchered to)
- Return status (available, probable, questionable, doubtful, won't return)
- Half-time updates
- Ejection notices (Flagrant 1, Flagrant 2, technical fouls)
- Team mascot integration for bench returns

### Core Functionality
- One-click copy to clipboard for all generated messages
- Real-time message generation as you type
- Persistent state across navigation
- Responsive Material-UI design

## Technology Stack

- **Framework:** React 18 with TypeScript
- **UI Library:** Material-UI (MUI) v6
- **Routing:** React Router v6
- **State Management:** React Context API
- **Forms:** React Hook Form
- **Utilities:** react-copy-to-clipboard, react-document-title
- **Build Tool:** Create React App

## Project Structure

```
src/
├── components/
│   ├── inputs.tsx                 # Shared input form component
│   ├── inputs-context.ts          # Context for managing input state
│   ├── inputs-context-wrapper.tsx # Context provider wrapper
│   ├── status-update.tsx          # Status message card with copy button
│   └── layout/                    # Layout components and navigation
├── routes/
│   ├── home.tsx                   # Landing page
│   ├── error.tsx                  # 404 error page
│   ├── nfl/
│   │   ├── nfl-generator.tsx      # NFL generator page
│   │   └── generations.tsx        # NFL message templates
│   └── nba/
│       ├── nba-generator.tsx      # NBA generator page
│       └── generations.tsx        # NBA message templates
├── hooks/                         # Custom React hooks
├── utils/
│   ├── date.ts                    # Date utilities
│   └── text.ts                    # Text formatting utilities
└── types.ts                       # TypeScript type definitions
```

## Installation

```bash
npm install
```

## Usage

### Development

Start the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Build the app for production:

```bash
npm run build
```

The optimized build will be created in the `build/` folder.

### Testing

Run the test suite:

```bash
npm test
```

## How to Use

1. Navigate to either `/nfl` or `/nba` using the navigation menu
2. Enter the required information:
   - **Player name** (required): The player's full name
   - **Injury** (optional): Type of injury (e.g., "knee", "ankle")
   - **Day of Week**: The day the game is taking place
   - **Mascot** (NBA only, optional): Team mascot name for bench return messages
3. View the generated status messages below the form
4. Click the copy icon next to any message to copy it to your clipboard

### Example Output

**NFL:**
```
Status alert: Patrick Mahomes (ankle) questionable to return Sunday.
```

**NBA:**
```
Status alert: LeBron James (knee) headed to locker room Wednesday.
```

## Configuration

No environment variables are required for this application. The `.env` file is empty and available for future configuration needs.

## Code Formatting

This project uses Prettier for code formatting. Configuration is in `.prettierrc.json`.

## Development Notes

- Built with Create React App
- Uses TypeScript for type safety
- Material-UI provides the component library and theming
- Context API manages shared state between NFL and NBA generators
- All status messages follow the format: `Status alert: {Player} ({Injury}) {Action} {Day}.`

## Browser Support

- Production: >0.2%, not dead, not op_mini all
- Development: Latest Chrome, Firefox, and Safari

## License

This is a personal project.
