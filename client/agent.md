# Agent Context - Client

## Project Overview
Next.js 15 application for an auctioneers website with public pages and an authenticated dashboard.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui ("new-york" style)
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Project Structure
```
client/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Landing page
│   │   ├── login/page.tsx  # Login page
│   │   ├── auctions/[id]/  # Public auction details
│   │   └── dashboard/      # Protected dashboard (requires auth)
│   ├── components/
│   │   ├── ui/             # shadcn/ui components
│   │   ├── dashboard/      # Dashboard-specific components
│   │   ├── header.tsx      # Public header
│   │   ├── footer.tsx      # Public footer
│   │   ├── hero.tsx        # Landing hero section
│   │   └── ...
│   ├── stores/             # Zustand stores
│   │   ├── useAuthStore.ts
│   │   └── useDashboardMenuStore.ts
│   ├── lib/
│   │   ├── api.ts          # API calls
│   │   ├── utils.ts        # Utilities (cn helper)
│   │   └── hooks.ts        # Custom hooks
│   ├── types/              # TypeScript types
│   ├── validations/        # Zod schemas
│   ├── config/
│   │   └── apiClient.ts    # Axios instance config
│   └── middleware.ts       # Next.js middleware (auth)
```

## Key Conventions

### shadcn/ui Components
- All UI components are in `@/components/ui`
- Use `cn()` utility from `@/lib/utils` for class merging
- Components follow the "new-york" style

### Authentication Flow
- Middleware verifies JWT token before each request
- Protected routes redirect to `/login` if no token
- Auth routes redirect to `/dashboard` if token exists
- `useAuthStore` (Zustand) manages global auth state
- `useAuth` hook provides user data access

### API Communication
- All API calls go through `apiClient.ts` (Axios instance)
- Server runs on port 4000 (check `.env`)
- Use React Query for server state management

### CSS Variables
Theme uses CSS variables via Tailwind. Colors defined in `tailwind.config.ts`:
- `--background`, `--foreground`
- `--primary`, `--primary-foreground`
- `--card`, `--card-foreground`
- `--sidebar-*` variants for dashboard

## Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## Environment Variables (`.env`)
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Important Notes
- Dashboard is protected - requires authentication
- Public pages: landing, auctions list, auction details
- Forms use Zod validation schemas
- Dark mode support via `next-themes`