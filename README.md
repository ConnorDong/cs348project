# cs348project

# Setup/Run Instructions

## Backend

First time:

Run the contents of `/server/startup.sql` in MySQL to initialize the database.

```
cd server
npm install
```

Create a `.env` file in the `server` directory with the following contents:

```
DB_USER=your_username
DB_PASSWORD=your_password
```

Run the server:
`node ./index.js`

## Frontend/Client

First time:

```
cd client
npm install
```

Run the client:
`npm run dev`
