# Auctioneers API

REST API for auctioneers website. It's connected to a PostgreSQL database.

## Instalation & Run

```bash
# Clone the repository
git clone https://github.com/gonferreyra/auctioneers-website.git

# Install dependencies
cd auctioneers-website
cd server
npm install

# Run the server
npm run dev

# Open the browser and go to http://localhost:SERVER_PORT
```

Before running API server, you need to:

- Create a DB on PostgreSQL,
- Create a .env file ([dotenv
  ](https://www.npmjs.com/package/dotenv)) for your enviroment variables and set the following values.

```go
# ENVIROMENT
NODE_ENV=development

# FRONTEND URL
APP_ORIGIN=

#SERVER
SERVER_PORT=
SERVER_HOSTNAME=

#DB
DB_NAME=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=

#JWT
JWT_SECRET=
JWT_REFRESH_SECRET=

#RESEND
RESEND_API_KEY=
EMAIL_SENDER=
```

## Endpoints

### Auth

| Route | Description |

| Method | URL                        | Description                  |
| ------ | -------------------------- | ---------------------------- |
| `POST` | `/auth/register`           | Register a new user.         |
| `POST` | `/auth/login`              | Login a user.                |
| `GET`  | `/auth/logout`             | Logout a user.               |
| `GET`  | `/auth/refresh`            | Refresh a user's token.      |
| `GET`  | `/auth/email/verify/:code` | Verify a user's email.       |
| `POST` | `/auth/password/forgot`    | Send a password reset email. |
| `POST` | `/auth/password/reset`     | Reset a user's password.     |
|        |

### User

| Method | URL     | Description           |
| ------ | ------- | --------------------- |
| `GET`  | `/user` | Get the current user. |
|        |

### Session

| Method   | URL             | Description                |
| -------- | --------------- | -------------------------- |
| `GET`    | `/sessions`     | Get all the user sessions. |
| `DELETE` | `/sessions/:id` | Delete the user session.   |
|          |

### Case

| Method | URL                                                           | Description                                                                       |
| ------ | ------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `GET`  | `/cases?page=1&limit=10&sortBy=id&SortOrder=asc`              | Get all cases with pagination and sorted by id in ascending order.                |
| `GET`  | `/cases?page=1&limit=10&sortBy=recentMovement&SortOrder=desc` | Get all cases with pagination and sorted by recent movements in descending order. |
|        |

Examples

```bash
Order by ID ascending (by default):

GET /cases?page=1&limit=10&sortBy=id&sortOrder=asc
```

```bash
Order by intern_number descending:

GET /cases?page=1&limit=10&sortBy=intern_number&sortOrder=desc
```

```bash
Order by recent movements:

GET /cases?page=1&limit=10&sortBy=recentMovement&sortOrder=desc
```

### Movement

| Method | URL          | Description          |
| ------ | ------------ | -------------------- |
| `GET`  | `/movements` | Get all movements.   |
| `POST` | `/movements` | Create new movement. |
|        |
