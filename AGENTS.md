# AGENTS.md - Developer Guidelines

This file provides guidelines for AI agents working in this codebase.

## Project Overview

This is a full-stack application with:
- **Client**: Next.js 15 with React 18, TypeScript, TailwindCSS, Zustand, React Query
- **Server**: Express.js with TypeScript, Sequelize ORM (PostgreSQL), Zod validation

## Build/Lint/Test Commands

### Server (Express API)

```bash
# Development (hot reload)
npm run dev

# Build TypeScript
npm run build

# Start production
npm start
```

### Client (Next.js)

```bash
# Development
npm run dev

# Build
npm run build

# Lint (ESLint + Next.js)
npm run lint

# Start production
npm start
```

## Code Style Guidelines

### Imports

- Use absolute imports with `@/` alias in client (e.g., `@/components`, `@/lib/utils`)
- Group imports in this order:
  1. Node.js built-ins
  2. External libraries (express, zod, etc.)
  3. Internal modules (relative paths)
- Use named exports for services (`import * as services from '../services/...'`)
- Default exports for models and controllers

### TypeScript

- Always define explicit return types for functions
- Use interfaces for object shapes, types for unions/enums
- Avoid `any` - use `unknown` when type is truly unknown
- Use Zod for runtime validation (server-side)

### Naming Conventions

- **Files**: kebab-case (e.g., `auction.service.ts`, `custom-error.ts`)
- **Classes/Types**: PascalCase (e.g., `AuctionModel`, `IPropertyAuctionModel`)
- **Functions/Variables**: camelCase (e.g., `createAuction`, `auctionId`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `ONE_DAY_MS`)
- **Interfaces**: Prefix with `I` (e.g., `IAuctionModel`)

### Error Handling

- Use `CustomError` class for application errors with statusCode and message
- Controllers wrap logic in try/catch and pass errors to `next(error)`
- Use Zod schemas for request validation with `.parse()` or `.safeParse()`

### Database Models (Sequelize)

- Define interfaces for Model types (extends `Model<InferAttributes, InferCreationAttributes>`)
- Use `DataTypes` for column definitions
- Define relationships at model bottom (e.g., `hasOne`, `belongsTo`)
- Use optional fields with `?` in interfaces

### Validation Schemas (Zod)

- Use `.optional()` for nullable/optional fields
- Use `.preprocess()` for type coercion (e.g., string to Date)
- Use `.enum()` for strict enum values
- Use `.array()` for arrays, `.string().url()` for URL validation

### Express Routes

- Use Router pattern: `import { Router } from 'express'`
- Controller functions: `(req: Request, res: Response, next: NextFunction)`
- Pass errors to middleware with `next(error)`

### React/Next.js

- Use functional components with TypeScript
- Use `zod` with `react-hook-form` for form validation
- Use Zustand for global client state
- Use React Query (`@tanstack/react-query`) for server state
- Follow Next.js 15 App Router conventions

### Formatting

- Use Prettier with Tailwind CSS plugin (client)
- 2 spaces for indentation
- Semicolons at end of statements
- Single quotes for strings

## Key File Patterns

### Model Pattern
```typescript
import { DataTypes, Model } from 'sequelize';
import { DB } from '../config/db';

interface IModelName extends Model<...> {
  id?: number;
  // fields
}

const ModelName = DB.define<IModelName>('ModelName', {
  // columns
});
```

### Validation Schema Pattern
```typescript
import z from 'zod';

export const schemaName = z.object({
  field1: z.string(),
  field2: z.number().optional(),
});
```

### Controller Pattern
```typescript
export const handlerName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // validation
    // service call
    // response
  } catch (error) {
    next(error);
  }
};
```

## Environment Variables

- Server: `.env` with `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, etc.
- Client: `.env.local` with Next.js public variables

## Database

- PostgreSQL with Sequelize ORM
- Models defined in `server/src/models/`
- Migrations handled through Sequelize sync (dev) or CLI (production)
