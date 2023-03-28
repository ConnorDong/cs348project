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

To use prduction data, using the mysql command line from the `/db_schema` directory run `source create_tables.sql` and then `source production_data.sql`. Note that you must replace all occurrences of "/MY/ABSOLUTE/PATH/TO/" path in the LOCAL INFILE commands in `production_data.sql` to the absolute path to the data/processed directory on your system.

To use sample data, using the mysql command line from the `/db_schema` directory run `source create_tables.sql` and then `source sample_data.sql`


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

<br/>

# Features

#1

![Model](/pic/all_movies.png)
![Model](/pic/all_movies_2.png)

The users of this feature are the users looking to view all movies provided. The user interacts with this feature by selecting movies from the navigation bar and the application displays all movies stored in the database. 
Pagination is added to the list of movies with the ability to load more movies every 10 movies shown for users who wish to see more movies. The user interacts with this feature by clicking the Load More button and more movies will appear down the page.

#2

![Model](/pic/make_review.png)

We allow users to create reviews for titles. After clicking for more information about a title, they can click a “+” button to post a review for the title. They can provide a text description of their review, as well as give a rating from 0-10. 

#3

![Model](/pic/login.png)

We allow application users to register their own user profile with a username and password. In the application, we provide a login screen with username and password fields and a “login” button. If the user does not have an account, they click a “register” button which leads them to another form for registering with a new username/password. 

#4

![Model](/pic/detailed_info.png)

Users can retrieve detailed information about a title by clicking on a title from the list of titles page. In addition to the information from the general browse page, this will show information such as the year that the title was released, the genres that the title is associated with, a list of actors/writers/directors involved in the making of the title, as well as a list of reviews created by other users.

