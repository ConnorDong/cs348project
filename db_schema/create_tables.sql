-- NOTE: Please replace all occurrences of "/MY/ABSOLUTE/PATH/TO/" path in the LOCAL INFILE commands to the absolute path to the data/processed directory on your system.
-- There is no way in MySQL to do a variable path so you must hardcode the path (https://stackoverflow.com/a/41359626)

drop database db;
create database db;
use db;

-- need to set this or else you get this error
-- https://stackoverflow.com/questions/59993844/error-loading-local-data-is-disabled-this-must-be-enabled-on-both-the-client
SET GLOBAL local_infile=1;

-- NameBasics
create table NameBasics (
	nconst varchar(9) primary key,
    primaryName varchar(255),
    birthYear integer,
    deathYear integer
);

-- TitleBasics
create table TitleBasics (
	tconst varchar(9) primary key,
    titleType varchar(255),
    primaryTitle varchar(255),
    originalTitle varchar(255),
    isAdult boolean,
    startYear numeric,
    endYear numeric,
    runtimeMinutes numeric
);

-- TitleRatings
create table TitleRatings (
	tconst varchar(9) primary key,
    averageRating double,
    numVotes numeric,
    foreign key (tconst) references TitleBasics(tconst)
);

-- Genres
create table Genres (
	tconst varchar(255),
    genre varchar(255),
    primary key (tconst, genre),
    foreign key (tconst) references TitleBasics(tconst)
);

-- Portrays
create table Portrays (
	tconst varchar(255),
    nconst varchar(255),
    portray varchar(255),
    primary key (tconst, nconst, portray),
    foreign key (tconst) references TitleBasics(tconst),
    foreign key (nconst) references NameBasics(nconst)
);


create table Directors (
	tconst varchar(255),
    nconst varchar(255),
    primary key (tconst, nconst),
    foreign key (tconst) references TitleBasics(tconst),
    foreign key (nconst) references NameBasics(nconst)
);

create table Writers (
	tconst varchar(255),
    nconst varchar(255),
    primary key (tconst, nconst),
    foreign key (tconst) references TitleBasics(tconst),
    foreign key (nconst) references NameBasics(nconst)
);

-- User table
create table Users (
    userId varchar(255) primary key,
    username varchar(255),
    password varchar(255)
);
-- Define a trigger to return the userId after insertion into Users
CREATE TRIGGER ai_Users
AFTER INSERT ON Users
FOR EACH ROW
SET @last_uuid = NEW.userId;

-- User review table
create table UserReview (
	reviewId varchar(255) primary key,
    userId varchar(255) not null,
    tconst varchar(255) not null,
    rating float check (rating between 0.0 and 10.0),
    description text,
    foreign key (userId) references Users(userId),
	foreign key (tconst) references TitleBasics(tconst)
);

CREATE TRIGGER ai_UserReviews
AFTER INSERT ON UserReview
FOR EACH ROW
SET @last_uuid = NEW.reviewId;

show tables;
