# cs348project

# Setup/Run Instructions

## Backend

First time:

To use sample data, using the mysql command line from the / directory run `/db_schema/create_tables.sql` andthen `/db_schema/sample_data.sql`

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

The users of this feature are the users looking to view all movies provided. The user interacts with this feature by selecting movies from the navigation bar and the application displays all movies stored in the database. 

#2

![Model](/pic/make_review.png)

We allow users to create reviews for titles. After clicking for more information about a title, they can click a “+” button to post a review for the title. They can provide a text description of their review, as well as give a rating from 0-10. 

#3

![Model](/pic/login.png)

We allow application users to register their own user profile with a username and password. In the application, we provide a login screen with username and password fields and a “login” button. If the user does not have an account, they click a “register” button which leads them to another form for registering with a new username/password. 

#4

![Model](/pic/detailed_info.png)

Users can retrieve detailed information about a title by clicking on a title from the list of titles page. In addition to the information from the general browse page, this will show information such as the year that the title was released, the genres that the title is associated with, a list of actors/writers/directors involved in the making of the title, as well as a list of reviews created by other users.

