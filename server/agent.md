# Agent Context - Server

## Project Overview
REST API for an auctioneers website. Uses Express.js with PostgreSQL (via Sequelize) and JWT authentication.

## Tech Stack
- **Framework**: Express.js 4
- **Language**: TypeScript
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT (access + refresh tokens)
- **Password Hashing**: bcrypt
- **Email**: Resend (transactional emails)
- **Validation**: Zod
- **Logging**: Winston

## Project Structure
```
server/
├── src/
│   ├── index.ts            # Entry point
│   ├── config/
│   │   ├── db.ts           # Sequelize config
│   │   ├── resend.ts       # Email client
│   │   └── logger.ts       # Winston logger
│   ├── controllers/        # Request handlers
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   ├── case.controller.ts
│   │   ├── auction.controller.ts
│   │   ├── movement.controller.ts
│   │   └── session.controller.ts
│   ├── routes/             # Express routes
│   ├── services/           # Business logic
│   ├── models/             # Sequelize models
│   │   ├── user.model.ts
│   │   ├── case.model.ts
│   │   ├── auction.model.ts
│   │   ├── movement.model.ts
│   │   ├── propertyCase.model.ts
│   │   ├── vehicleCase.model.ts
│   │   ├── propertyAuction.model.ts
│   │   └── vehicleAuction.model.ts
│   ├── middleware/
│   │   ├── authenticate.ts # JWT verification
│   │   ├── errorHandler.ts # Error handling
│   │   └── loggerHandler.ts
│   ├── validations/        # Zod schemas
│   ├── utils/
│   │   ├── jwt.ts          # Token utilities
│   │   ├── bcrypt.ts       # Password utilities
│   │   ├── cookies.ts      # Cookie helpers
│   │   ├── sendMail.ts     # Email sending
│   │   └── date.ts         # Date utilities
│   ├── constants/          # Constants
│   └── logs/               # Log files
```

## Key Conventions

### Database Models
- Main models: User, Case, Auction, Movement
- Dynamic/extended models for specific types:
  - PropertyCase, VehicleCase
  - PropertyAuction, VehicleAuction
- Uses Sequelize with TypeScript

### Authentication
- JWT access tokens + refresh tokens
- Access token stored in memory (client)
- Refresh token in httpOnly cookie
- Tokens validated via `authenticate` middleware

### API Endpoints

| Prefix | Description |
|--------|-------------|
| `/auth` | Authentication (register, login, logout, refresh, verify email, password reset) |
| `/user` | Current user info |
| `/sessions` | User sessions management |
| `/cases` | Case management (CRUD, pagination, search, sorting) |
| `/movements` | Movement management |
| `/auctions` | Auction management |

### Error Handling
- Custom error classes in `utils/customError.ts`
- Global error handler middleware
- Proper HTTP status codes

### Email
- Uses Resend for transactional emails
- Templates in `utils/emailTemplates.ts`

## Scripts
- `npm run dev` - Start with ts-node-dev (hot reload)
- `npm run build` - Compile TypeScript to `dist/`

## Environment Variables (`.env`)
```env
NODE_ENV=development
APP_ORIGIN=http://localhost:3000
SERVER_PORT=4000
SERVER_HOSTNAME=localhost
DB_NAME=auctioneers
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret
RESEND_API_KEY=re_xxx
EMAIL_SENDER=noreply@auctioneers.com
```

## Important Notes
- Server runs on port 4000 by default
- PostgreSQL database required before running
- All routes (except auth) require authentication
- Case supports pagination: `?page=1&limit=10`
- Case supports sorting: `?sortBy=id&sortOrder=asc`
- Case supports search: `?searchTerm=xxx&searchType=all&caseType=property`
- Movement records track case activities
- Cases can be "property" or "vehicle" type