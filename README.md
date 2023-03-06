# cs348project

# Setup/Run Instructions

## Download the dataset

To download the [IMDB dataset](https://www.imdb.com/interfaces/), run the script

```
source get_data.sh
```

This will download the raw dataset in the `./raw` directory.

## Process the data for SQL tables

The raw dataset is not normalized for SQL tables (e.g. some columns are multivalued, which we can split into separate tables). We created a Python script `process_data.py` which performs some data preprocessing before inserting into SQL tables.

To run it, first make sure you have the Python dependencies, run

```
pip3 install -r requirements.txt
```

Run the data processing script:

```
python3 process_data.py
```

The processed data will be in the `./processed` directory.

## Backend

First time:

Run the contents of `/dbschema/init_tables.sql` in MySQL to initialize the database. This create tables and load the IMDB data from `data/processed` into SQL tables.

To use sample data instead, run `/dbschema/create_tables.sql` andthen `/dbschema/startup.sql`

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
nodedemon ./index.js
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
