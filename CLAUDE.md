# Sports Shortcuts - Development Guidelines

## Project Overview

Sports Shortcuts is a React TypeScript web app that generates standardized sports injury/status alert messages for NFL and NBA. Built with Vite and Material-UI.

## Tech Stack

- **Framework:** React 18 with TypeScript
- **UI Library:** Material-UI (MUI) v6
- **Routing:** React Router v6
- **Forms:** react-hook-form
- **Build:** Vite

## Development Commands

```bash
npm start          # Start dev server on http://localhost:5174
npm run build      # Production build to /dist
npm run preview    # Preview production build
```

## Project Structure

```
src/
├── components/    # Reusable UI components
│   ├── layout/    # Header, footer, layout wrapper
│   └── inputs.tsx # Form input components
├── routes/        # Page components
│   ├── nfl/       # NFL generator pages
│   └── nba/       # NBA generator pages
├── hooks/         # Custom React hooks
├── utils/         # Helper functions
└── types.ts       # Shared TypeScript types
```

## Key Patterns

### State Management
- Uses React Context API for sharing input state between components
- `InputsContextWrapper` provides the context at the app level
- No Redux - keep state management simple with Context + hooks

### Component Organization
- Layout components wrap all pages (header, footer, container)
- Route components in `/routes` correspond to URL paths
- Shared components in `/components`

### Forms
- Use `react-hook-form` for form handling
- Input validation should happen at the form level

### Styling
- Material-UI components with Emotion CSS-in-JS
- Use MUI's `sx` prop for one-off styles
- Global styles in `index.css`

## Code Quality

- **Formatting:** Prettier (run automatically, config in `.prettierrc.json`)
- **Linting:** ESLint
- **TypeScript:** Strict mode enabled

## Testing

- Jest with React Testing Library
- Test files should be colocated with components or in `__tests__` folders
- Run `npm test` for watch mode

## Adding New Features

### New Sport Generator
1. Create route folder in `src/routes/[sport]/`
2. Add generator page and generations display components
3. Add route in `App.tsx`
4. Update navigation in header if needed

### New Input Field
1. Update types in `types.ts` if needed
2. Add field to `InputsContext`
3. Update `inputs.tsx` component
