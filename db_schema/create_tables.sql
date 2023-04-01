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

CREATE INDEX idx_tconst ON TitleBasics (tconst);

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

create table GenreInfo (
	genre varchar(255) primary key,
    description text
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

CREATE INDEX idx_userId ON Users (userId);

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

create table UserFollows (
    userId varchar(255) not null,
    followsUserId varchar(255) not null,
    primary key (userId, followsUserId),
    foreign key (userId) references Users(userId),
    foreign key (followsUserId) references Users(userId),
    -- users cannot follow themselves
    constraint columns_cannot_equal check (userId <> followsUserId)
);

create table WatchList (
    listId varchar(255) primary key,
    userId varchar(255) not null,
    listName varchar(255) not null,
    foreign key (userId) references Users(userId)
);

CREATE TRIGGER ai_WatchList
AFTER INSERT ON WatchList
FOR EACH ROW
SET @last_uuid = NEW.listId;

create table WatchListItem (
    listId varchar(255) not null,
    tconst varchar(255) not null,
    primary key (listId, tconst),
    foreign key (listId) references WatchList(listId),
    foreign key (tconst) references TitleBasics(tconst)
);

-- ------ Tables for fancy feature: RBAC
create table Roles (
    roleId varchar(255) primary key,
    name varchar(255) unique not null
);

create table Permissions (
    permissionId varchar(255) primary key,
    permissionName varchar(255) unique not null,
    description varchar(255)
);

-- UserRole table (mapping users to roles)
create table UserRoles (
    userId varchar(255),
    roleId varchar(255),
    primary key (userId, roleId),
    foreign key (userId) references Users(userId),
    foreign key (roleId) references Roles(roleId)
);

-- RolePermission table (mapping roles to permissions)
create table RolePermissions (
    roleId varchar(255),
    permissionId varchar(255),
    primary key (roleId, permissionId),
    foreign key (roleId) references Roles(roleId),
    foreign key (permissionId) references Permissions(permissionId)
);

show tables;
