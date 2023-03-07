# cs348project

# Setup/Run Instructions

## Backend

First time:

To use sample data, run `/db_schema/create_tables.sql` andthen `/db_schema/sample_data.sql`

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

```
node index.js
```

## Frontend/Client

First time:

```
cd client
npm install
```

Create a `.env.local` file in the `client` directory with the following contents:

```
HOSTNAME=localhost
PORT=5001
HOST=http://$HOSTNAME:$PORT
```

Run the client:
`npm run dev`
