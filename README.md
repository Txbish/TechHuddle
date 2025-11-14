# TechHuddle - Developer Events Platform

A modern, full-stack web application for discovering, exploring, and managing tech events. TechHuddle connects developers with industry conferences, hackathons, meetups, and workshops happening worldwide.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?style=flat-square&logo=prisma)

## 🚀 Features

- **Event Discovery** - Browse and search through tech events worldwide
- **Event Details** - Get comprehensive information about events including agendas, speakers, and locations
- **Event Booking** - Reserve your spot at events you're interested in
- **Advanced Filtering** - Filter events by date, location, mode (in-person/hybrid/online), and tags
- **Real-time Data** - Server-side caching with React Query for optimal performance
- **Responsive Design** - Beautiful UI that works on all devices
- **Analytics** - Integrated PostHog analytics to track user engagement
- **Image Optimization** - Cloudinary integration for efficient image delivery

## 🛠️ Tech Stack

### Frontend

- **[Next.js 16](https://nextjs.org/)** - React framework with Turbopack for fast builds and development
- **[React 19.2](https://react.dev/)** - UI library with latest features and hooks
- **[React Compiler](https://react.dev/learn/react-compiler)** - Automatic optimization of React components
- **[TypeScript 5](https://www.typescriptlang.org/)** - Static type checking for JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Query (TanStack Query)](https://tanstack.com/query/latest)** - Server state management and data fetching
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[clsx](https://github.com/lukeed/clsx)** - Utility for constructing className strings
- **[Tailwind Merge](https://github.com/dcastil/tailwind-merge)** - Merge Tailwind CSS classes intelligently

### Backend

- **[Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)** - Serverless API endpoints
- **[Prisma 6](https://www.prisma.io/)** - Type-safe database ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database
- **[Cloudinary](https://cloudinary.com/)** - Cloud-based image storage and optimization

### Development & Tooling

- **[Turbopack](https://turbo.build/pack)** - Next-generation bundler for fast compilation
- **[ESLint](https://eslint.org/)** - Code linting and quality
- **[PostHog](https://posthog.com/)** - Product analytics and feature flags
- **[Node Fetch](https://github.com/node-fetch/node-fetch)** - Fetch API for Node.js
- **[Form Data](https://github.com/form-data/form-data)** - FormData for Node.js

## 📋 Project Structure

```
my-app/
├── app/                          # Next.js app directory
│   ├── api/
│   │   └── events/               # Event API routes
│   │       └── route.ts          # POST/GET events endpoints
│   ├── events/
│   │   └── [slug]/               # Dynamic event detail page
│   │       ├── page.tsx          # Event page
│   │       ├── useEvent.ts       # React Query hook
│   │       ├── EventDetailServer.tsx
│   │       └── EventDetailClient.tsx
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Home page with events list
│   ├── globals.css               # Global styles
│   └── providers.tsx             # React Query provider
├── components/                   # Reusable React components
│   ├── EventCard.tsx             # Event card component
│   ├── EventDetails.tsx          # Event details (server component)
│   ├── EventDetailsClient.tsx    # Event details (client component)
│   ├── NavBar.tsx                # Navigation bar
│   ├── LightRays.tsx             # Visual effects component
│   ├── ExploreBtn.tsx            # CTA button
│   └── BookEvent.tsx             # Event booking form
├── lib/                          # Utility functions and helpers
│   ├── prisma.ts                 # Prisma client
│   ├── utils.ts                  # Helper utilities
│   ├── constants.ts              # Application constants
│   └── actions/                  # Server actions
├── prisma/                       # Prisma configuration
│   ├── schema.prisma             # Database schema
│   └── generated/                # Generated Prisma types
├── public/                       # Static assets
│   ├── images/                   # Event images
│   └── icons/                    # SVG icons
├── scripts/                      # Utility scripts
│   └── uploadEvents.js           # Script to seed events
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.mjs           # Tailwind CSS configuration
├── postcss.config.mjs            # PostCSS configuration
├── prisma.config.ts              # Prisma configuration
├── components.json               # Component metadata
└── package.json                  # Project dependencies
```

## 🔧 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (or any Prisma-supported database)

### Setup Steps

1. **Clone the repository**

```bash
git clone https://github.com/Txbish/TechHuddle.git
cd TechHuddle
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/techhuddle

# Cloudinary
CLOUDINARY_URL=cloudinary://your-key:your-secret@your-cloud-name

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=your-posthog-key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

# App Config
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. **Set up the database**

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed the database with sample events
npm run upload:events
```

5. **Start the development server**

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📦 Available Scripts

```bash
# Development
npm run dev              # Start Next.js development server with hot reload

# Production
npm run build            # Build for production (generates Prisma client & builds Next.js)
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint

# Database & Events
npm run upload:events    # Upload sample events using local images
```

## 🌐 API Endpoints

### Events API

**GET /api/events**

- Fetch all events
- Returns paginated list of events from database

**POST /api/events**

- Create a new event
- Accepts multipart/form-data with event details and image
- Required fields: title, description, image, date, location

**GET /api/events/[slug]**

- Fetch a specific event by slug

## 🎨 Key Features Explained

### Server-Side Caching

Events are fetched server-side and cached with a 1-hour revalidation strategy for optimal performance.

### React Query Integration

- Configured with 5-minute stale time
- 10-minute cache time
- Single client instance that persists across renders
- Automatic refetching and background sync

### Component Architecture

- **Server Components** - Fetch data and handle caching
- **Client Components** - Handle interactivity and UI state
- **Proper Suspense Boundaries** - For efficient loading states

### Image Optimization

- Cloudinary integration for automatic image optimization
- Responsive image delivery
- Support for modern image formats

### Database Schema

Events stored with fields for:

- Title, slug, description, overview
- Location, venue, mode (in-person/hybrid/online)
- Date, time, agenda items
- Audience type, organizer info
- Tags for categorization
- Image URL (from Cloudinary)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables for Production

- Set `DATABASE_URL` to your production PostgreSQL database
- Update `CLOUDINARY_URL` with production credentials
- Configure `NEXT_PUBLIC_BASE_URL` for your domain
- Set PostHog keys for production analytics

## 📊 Performance Optimizations

- **React Compiler** - Automatic component memoization
- **Turbopack** - Fast bundling and hot module replacement
- **Cache Components** - Next.js 16 cache directive support
- **Server-Side Caching** - 1-hour revalidation on events
- **Image Optimization** - Cloudinary for efficient delivery
- **React Query** - Smart caching and background updates

## 🔒 Security Considerations

- TypeScript for type safety
- Environment variables for sensitive data
- Server-side validation of form data
- CORS-safe API endpoints
- Cloudinary for secure image storage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 📧 Support

For issues, questions, or suggestions, please open an issue in the repository.

## 🎯 Roadmap

- [ ] User authentication and profiles
- [ ] Event recommendations based on interests
- [ ] Email notifications for new events
- [ ] Social sharing features
- [ ] Advanced search and filtering
- [ ] Event reviews and ratings
- [ ] Attendee networking features
- [ ] Mobile app

---

**Made with ❤️ for the developer community**
