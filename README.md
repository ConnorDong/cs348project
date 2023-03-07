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

