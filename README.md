# Discord Clone

A full-stack real-time messaging application built with Next.js 15, featuring servers, channels, direct messages, and real-time communication via Socket.io.

## Features

### Authentication
- User authentication powered by Clerk
- Profile management with avatar support

### Server Management
- Create and customize servers with name and image
- Generate unique invite links for server members
- Role-based access control (Admin, Moderator, Guest)
- Server settings management (edit, delete, leave)

### Channel Management
- Create text, audio, and video channels
- Edit and delete channels (Admin/Moderator only)
- Channel-specific messaging

### Real-time Messaging
- Send text messages in channels
- File attachments (images, PDFs)
- Edit and delete messages
- Real-time message updates via WebSocket
- Infinite scroll for message history
- "Edited" indicator for modified messages

### Direct Messages
- Private conversations between members
- Same features as channel messaging

### User Interface
- Responsive design for desktop and mobile
- Dark/Light mode toggle
- Server and channel navigation sidebar
- Member list with role indicators
- Search functionality for channels and members

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible UI components
- **Lucide React** - Icons
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Zustand** - State management
- **TanStack Query** - Server state management

### Backend
- **Next.js API Routes** - REST API endpoints
- **Socket.io** - Real-time WebSocket communication
- **Prisma** - Database ORM
- **MySQL** - Database

### Services
- **Clerk** - Authentication
- **UploadThing** - File uploads

## Project Structure

```
discord-clone/
├── app/
│   ├── (auth)/              # Authentication pages
│   ├── (invite)/            # Invite handling
│   ├── (main)/              # Main application routes
│   ├── (setup)/             # Initial setup
│   └── api/                 # API routes
├── components/
│   ├── chat/                # Chat components
│   ├── models/              # Modal dialogs
│   ├── navigation/          # Navigation components
│   ├── providers/           # Context providers
│   ├── server/              # Server-related components
│   └── ui/                  # Reusable UI components
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
├── pages/api/socket/        # Socket.io API routes
├── prisma/                  # Database schema
└── types.ts                 # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+
- MySQL database
- Clerk account
- UploadThing account

### Environment Variables

Create a `.env` file in the root directory:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Database
DATABASE_URL=

# UploadThing
UPLOADTHING_TOKEN=
```

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd discord-clone
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### Models

- **Profile** - User profile linked to Clerk authentication
- **Server** - Discord-like servers with invite codes
- **Member** - Server membership with roles
- **Channel** - Text/Audio/Video channels within servers
- **Message** - Channel messages with file support
- **Conversation** - Direct message conversations
- **DirectMessage** - Private messages between members

### Relationships

```
Profile
  └── Server (owner)
  └── Member (membership)
  └── Channel (creator)

Server
  └── Member[]
  └── Channel[]

Member
  └── Message[]
  └── Conversation[] (initiated/received)
  └── DirectMessage[]

Channel
  └── Message[]

Conversation
  └── DirectMessage[]
```

## API Endpoints

### REST API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/servers | Create a new server |
| PATCH | /api/servers/[serverId] | Update server |
| DELETE | /api/servers/[serverId] | Delete server |
| PATCH | /api/servers/[serverId]/invite-code | Generate new invite code |
| PATCH | /api/servers/[serverId]/leave | Leave server |
| POST | /api/channels | Create a new channel |
| PATCH | /api/channels/[channelId] | Update channel |
| DELETE | /api/channels/[channelId] | Delete channel |
| PATCH | /api/members/[memberId] | Update member role |
| DELETE | /api/members/[memberId] | Kick member |
| GET | /api/messages | Fetch messages (paginated) |

### Socket.io Events

| Event | Description |
|-------|-------------|
| `chat:[channelId]:messages` | New message in channel |
| `chat:[channelId]:messages:update` | Message updated/deleted |

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## License

This project is for educational purposes.

