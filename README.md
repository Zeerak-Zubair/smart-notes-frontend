
# Smart Notes Application - Probation Project

## Project Overview

### Project Name

Smart Notes - Note-Taking Application with AI Features

### Project Type

Technical Assessment / Probation Project

### Project Duration

**4 weeks (1 month)**

### Objective

Build a functional note-taking application demonstrating proficiency in modern web development, Supabase backend services, real-time features, and third-party API integration.

----------

## Technical Stack (Required)

### Frontend

Choose one:

-   **React.js** with TypeScript preferred
    -   State Management: Context API or Zustand
    -   UI Components: Any component library (MUI, Ant Design, or Chakra UI)
    -   Rich Text Editor: TipTap or React-Quill
-   **Flutter Web**
    -   State Management: Provider or Riverpod
    -   Rich Text: flutter_quill

### Backend (Mandatory)

-   **Supabase** (can use free tier at supabase.com)
    -   Database: PostgreSQL
    -   Auth: Supabase Auth
    -   Storage: Supabase Storage
    -   Edge Functions: Must Have
    -   Realtime: Supabase Realtime subscriptions

### External Services

-   **CRON Jobs**: cron-job.org (free tier)
-   **AI Integration**: OpenAI GPT-4-mini API (simpler than local Ollama)

----------

## Core Requirements (Must Have)

### 1. Authentication

-   Email/password sign up and login
-   Session management
-   Protected routes
-   User profile with avatar upload

### 2. Notebook Management

-   Create up to 10 notebooks per user
-   Each notebook has:
    -   Title and description
    -   Color theme (5 preset colors)
    -   Created/updated timestamps
-   CRUD operations on notebooks
-   List view with search functionality

### 3. Notes System

-   **50 pages maximum per notebook** (simplified from 100)
-   Rich text editor with:
    -   Basic formatting (bold, italic, underline)
    -   Headers (H1, H2, H3)
    -   Bullet and numbered lists
    -   Code blocks
    -   Links
-   Auto-save every 10 seconds
-   Manual save button
-   Page navigation (previous/next)

### 4. Media Support (Simplified)

-   **Images Audio Video Support** 
-   Maximum 10MB allowed
-   Drag-and-drop or click to upload
-   Display inline in notes
-   Store in Supabase Storage

### 5. Daily Backup (Simplified)

-   CRON job at 12 AM that triggers a Supabase Edge Function
-   Creates a JSON export of all user notes
-   Stores backup in Supabase Storage
-   Last 7 backups retained
-   Simple restore feature from backup list

### 6. WebSocket Feature

Implement ONE of these real-time features:

-   **Option A**: Live word count and character count across all active sessions
-   **Option B**: "Currently editing" indicator when multiple tabs are open
-   **Option C**: Real-time notification when notebook is modified in another session

### 7. AI Writing Assistant (Simplified)

Implement these 3 features using GPT-4-mini API:

-   **Grammar Check**: Highlight grammar issues and allow options to fix
-   **Rephrase**: Offer 2 alternative phrasings for selected text (Friendly, Professional)
-   **Summarize**: Create a brief summary of the entire note



## UI/UX Requirements

### Design Inspiration

Reference: https://www.behance.net/gallery/186619377/Education-Hub

-   Clean, educational interface
-   Card-based notebook display
-   Sidebar navigation
-   Focus on readability

### Essential Screens

1.  **Landing/Login Page**
2.  **Dashboard** - Shows all notebooks
3.  **Notebook View** - Shows pages list
4.  **Note Editor** - Main editing interface
5.  **Profile/Settings** - Basic user settings

### Responsive Design

-   Must work on desktop (primary)
-   Basic mobile responsiveness (tablet minimum)

----------

## Weekly Milestones

### Week 1: Foundation

**Goal: Working auth and basic UI structure**

-   [ ] Supabase project setup
-   [ ] Authentication flow complete
-   [ ] Basic routing and layout
-   [ ] Database tables created
-   [ ] Create/Read notebooks

### Week 2: Core Functionality

**Goal: Full CRUD operations and rich text editing**

-   [ ] Complete notebook CRUD
-   [ ] Rich text editor integration
-   [ ] Notes creation and editing
-   [ ] Auto-save functionality
-   [ ] Page navigation within notebooks

### Week 3: Advanced Features

**Goal: Media, backups, and real-time features**

-   [ ] Image upload and display
-   [ ] Backup Edge Function
-   [ ] CRON job setup and testing
-   [ ] WebSocket feature implementation
-   [ ] Restore from backup

### Week 4: AI Integration & Polish

**Goal: AI features and final touches**

-   [ ] AI assistant Edge Function
-   [ ] Grammar check integration
-   [ ] Rephrase and summarize features
-   [ ] UI polish and bug fixes
-   [ ] Basic error handling
-   [ ] Deployment

----------

## Simplified Project Structure

### React.js Structure

```
src/
├── components/
│   ├── Layout/
│   ├── Notebooks/
│   ├── Editor/
│   └── AI/
├── pages/
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── NotebookView.tsx
│   └── Editor.tsx
├── services/
│   ├── supabase.ts
│   └── ai.service.ts
├── hooks/
│   └── useAutoSave.ts
└── types/

```

----------

## Evaluation Criteria

### Technical Skills (60%)

-   Clean, organized code structure
-   Proper TypeScript/type usage
-   Efficient database queries
-   Proper error handling
-   Security best practices (input validation, SQL injection prevention)

### Feature Completion (25%)

-   All core features working
-   Edge Functions deployed and functional
-   CRON job configured correctly
-   AI integration working

### UI/UX (15%)

-   Clean, intuitive interface
-   Responsive design basics
-   Loading states and user feedback
-   Consistent styling

----------

## Deliverables

1.  **Source Code**: GitHub repository with clear README
2.  **Live Demo**: Deployed application (Vercel/Firebase/Netlify free tier)
3.  **Documentation**:
    -   Setup instructions
    -   Environment variables needed
    -   Brief architecture explanation
4.  **Demo Video**: 3-5 minute walkthrough of features

----------

## Resources Provided

### API Keys (will be provided)

-   Supabase project URL and anon key
-   OpenAI API key with usage limits

### Documentation Links

-   [Supabase Quickstart](https://supabase.com/docs/guides/getting-started)
-   [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
-   [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
-   [cron-job.org Documentation](https://cron-job.org/en/members/documentation/)

----------

## Acceptable Shortcuts

Given the time constraint, these simplifications are acceptable:

1.  **No user collaboration** - single user only
2.  **Basic error handling** - don't need comprehensive error recovery
3.  **Simple UI** - can use component library defaults
4.  **No offline support**
5.  **No advanced encryption** for backups
6.  **No PDF export** or other formats
7.  **Basic search** - title search only
8.  **No themes** - just light mode

----------

## Bonus Points (If Time Permits)

-   Dark mode toggle
-   Markdown preview mode
-   Export single note as Markdown file
-   Keyboard shortcuts for formatting
-   Note templates
-   Tags or categories for notebooks

----------

## Questions & Support

-   Daily stand-up check-ins expected (5 minutes via Slack/Discord)
-   Questions encouraged - shows engagement
-   Can request one code review during Week 2 or 3
-   Final presentation on last day

----------

## Important Notes

1.  **Focus on functionality over perfection** - working features are better than perfect but incomplete ones
2.  **Commit regularly** - we want to see your development process
3.  **Ask for clarification** when needed - communication is part of the evaluation
4.  **Use free tiers** for all services to avoid costs
5.  **Document any assumptions** you make

----------

## Success Indicators

A successful project will:

-   ✅ Allow users to create and manage notebooks
-   ✅ Support rich text note-taking with images
-   ✅ Auto-save and manual save work reliably
-   ✅ Daily backups run automatically
-   ✅ At least one real-time feature works
-   ✅ AI writing assistance provides useful suggestions
-   ✅ Application is deployed and accessible
-   ✅ Code is clean and documented

----------

_Project Version: 1.0 - Probation Assessment_ _Duration: 4 Weeks_ _Start Date: 02/01/2026
