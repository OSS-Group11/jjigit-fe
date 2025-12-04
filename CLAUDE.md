# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

JJiGiT is an open-source, real-time polling platform built with React. The frontend communicates with a Spring Boot backend (separate repository) and includes AI-powered features for topic suggestions and discussion summarization.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on port 3000 by default)
npm start

# Build for production
npm build

# Run tests
npm test
```

## Backend Integration

- **API Base URL**: Configured in [src/api/axios.js](src/api/axios.js) pointing to `http://3.37.253.134:8080`
- **Local Backend Proxy**: `package.json` includes proxy to `http://localhost:8080` for development
- **JWT Authentication**: All API requests automatically include JWT token from localStorage via axios interceptor
- **WebSocket**: Real-time voting updates use STOMP over WebSocket at `/ws` endpoint

## Architecture & Key Patterns

### Authentication Flow
- JWT tokens stored in localStorage with key `jjigit-token`
- [AuthContext](src/contexts/AuthContext.js) provides global authentication state via React Context
- [ProtectedRoute](src/App.js:25-33) component wraps routes requiring authentication
- Token automatically attached to requests via axios interceptor in [src/api/axios.js](src/api/axios.js:9-15)

### Real-Time Updates
- Poll results update in real-time using STOMP WebSocket client
- Connection setup in [PollPage](src/pages/Pollpage.js:50-70)
- Subscribes to `/topic/poll/{pollId}` for live vote counts
- Uses `@stomp/stompjs` library

### Page Structure
- **HomePage**: Landing page with hero section, feature carousel, and call-to-action
- **CreatePollPage**: Protected route for creating polls with image upload support
- **PollPage**: Main voting interface showing either voting form (pre-vote) or results chart (post-vote)
- **CommunityPage**: Public polls listing
- **LoginPage/SignupPage**: Authentication pages

### Component Organization
- **Layout Components**: `Layout`, `Header` - wrap all pages with consistent navigation
- **Poll Components**: `PollCreationForm`, `PollVoting`, `PollResultsChart`, `PollCard`, `PollList`
- **Comment Components**: `CommentForm`, `CommentList` - support nested comments per poll option
- **Feature Components**: `FeatureSections`, `FeatureCarousel`, `SplashComponent`

### State Management
- No external state management library (Redux, Zustand, etc.)
- Uses React hooks (`useState`, `useEffect`, `useContext`)
- Global auth state managed via AuthContext
- Local component state for UI interactions

### Styling
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for animations and transitions
- **lucide-react** for icons
- Configuration in [tailwind.config.js](tailwind.config.js)

## API Endpoints Used

```
POST   /api/polls                      - Create new poll (with FormData/multipart)
GET    /api/polls/:pollId              - Get poll details
GET    /api/polls/:pollId/status       - Check if user has voted
POST   /api/polls/:pollId/vote         - Submit vote { optionId }
GET    /api/polls/:pollId/comments     - Get all comments
POST   /api/polls/:pollId/comments     - Create comment { optionId?, content, parentId? }
PUT    /api/polls/:pollId/comments/:id - Update comment { content }
POST   /api/auth/validate              - Validate JWT token
```

## Important Implementation Details

### Poll Creation
- Uses FormData for multipart/form-data submission to support image uploads
- Options array sent as indexed fields: `options[0]`, `options[1]`, etc.
- Empty options are filtered out before submission
- See [CreatePollPage.js](src/pages/CreatePollPage.js:18-39)

### Comment System
- Supports nested comments via `parentId` field
- Comments can be associated with specific poll options via `optionId`
- General poll comments have `optionId: null`
- Backend must support `optionId`, `parentId`, and `commentId` fields

### Vote State Management
- `hasVoted` state determines whether to show voting form or results chart
- Retrieved from `/api/polls/:pollId/status` endpoint
- No re-voting allowed once voted (enforced by backend)

### WebSocket Configuration
- WebSocket URL configurable via `REACT_APP_WS_URL` environment variable
- Falls back to `ws://localhost:8080/ws` if not set
- Auto-reconnect with 500ms delay

## File Naming Conventions

- Component files: PascalCase (e.g., `PollVoting.js`, `HomePage.js`)
- Utility files: camelCase (e.g., `axios.js`)
- Context files: PascalCase with "Context" suffix (e.g., `AuthContext.js`)
- Page files: PascalCase with "Page" suffix (e.g., `CreatePollPage.js`)

## Known Inconsistencies

- Some components use inline styles (e.g., [PollVoting.js](src/components/PollVoting.js:39-61)), while most use Tailwind
- Token key inconsistency: AuthContext uses `jjigit-token`, but axios.js uses `jwtToken` - this should be unified
- [HomePage.js](src/pages/HomePage.js) has nested splash loading logic, but `App.js` already handles initial splash

## Upcoming Features (Per README)

- Public/Private poll visibility controls
- AI-powered argument summarization (pros/cons)
- Nested comment threads (structure exists, UI refinement needed)
- Mobile optimization
