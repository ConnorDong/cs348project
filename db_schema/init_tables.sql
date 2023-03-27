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

LOAD DATA 
	LOCAL INFILE '/Users/vincentyang/Downloads/cs348project/data/processed/nameBasics.tsv' 
    INTO TABLE NameBasics
    IGNORE 1 LINES;


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

LOAD DATA 
	LOCAL INFILE '/Users/vincentyang/Downloads/cs348project/data/processed/titleBasics.tsv' 
    INTO TABLE TitleBasics
    IGNORE 1 LINES;


-- TitleRatings
create table TitleRatings (
	tconst varchar(9) primary key,
    averageRating double,
    numVotes numeric,
    foreign key (tconst) references TitleBasics(tconst)
);

LOAD DATA 
	LOCAL INFILE '/Users/vincentyang/Downloads/cs348project/data/processed/titleRatings.tsv' 
    INTO TABLE TitleRatings
    IGNORE 1 LINES;


-- Genres
create table Genres (
	tconst varchar(255),
    genre varchar(255),
    primary key (tconst, genre),
    foreign key (tconst) references TitleBasics(tconst)
);

LOAD DATA 
	LOCAL INFILE '/Users/vincentyang/Downloads/cs348project/data/processed/genres.tsv' 
    INTO TABLE Genres
    IGNORE 1 LINES;


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

LOAD DATA 
	LOCAL INFILE '/Users/vincentyang/Downloads/cs348project/data/processed/characters.tsv' 
    INTO TABLE Portrays
    IGNORE 1 LINES;


create table Directors (
	tconst varchar(255),
    nconst varchar(255),
    primary key (tconst, nconst),
    foreign key (tconst) references TitleBasics(tconst),
    foreign key (nconst) references NameBasics(nconst)
);

LOAD DATA 
	LOCAL INFILE '/Users/vincentyang/Downloads/cs348project/data/processed/directors.tsv' 
    INTO TABLE Directors
    IGNORE 1 LINES;


create table Writers (
	tconst varchar(255),
    nconst varchar(255),
    primary key (tconst, nconst),
    foreign key (tconst) references TitleBasics(tconst),
    foreign key (nconst) references NameBasics(nconst)
);

LOAD DATA 
	LOCAL INFILE '/Users/vincentyang/Downloads/cs348project/data/processed/writers.tsv' 
    INTO TABLE Writers
    IGNORE 1 LINES;
    

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

INSERT INTO `Users` (`userId`, `username`, `password`) VALUES
('bcab1d5d-e34d-487f-bc67-493335499b07', 'jsmith', 'test123'),
('601876bb-8b8b-4558-8a79-e9d70ff76b46', 'mjane', 'helloworld'),
('c67fc6f1-d219-4bcd-8921-f8117ab6169a', 'pacman', 'helloworld123');

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

INSERT INTO `UserReview` (`reviewId`, `userId`, `tconst`, `rating`, `description`) VALUES
('7837bd50-b7ec-4d45-b66e-4932c378f078', 'bcab1d5d-e34d-487f-bc67-493335499b07', 'tt0000001', 9.6, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id laoreet felis, vitae eleifend metus. Quisque lacinia rutrum dolor ultrices blandit. Morbi mi lorem, fermentum ut lectus nec, ornare convallis felis. Ut in tristique purus, non auctor mi. Nunc ultrices ac augue nec sodales. Vivamus non risus ac purus lacinia luctus sed et purus. Cras porta, felis eget tincidunt aliquet, diam justo auctor elit, at tempus est orci et purus. Proin a lectus interdum libero.'),
('e135899c-075b-4471-b8d4-11c72d9abf24', '601876bb-8b8b-4558-8a79-e9d70ff76b46', 'tt0000002', 8.5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt suscipit turpis ut ullamcorper. Pellentesque dictum a quam a eleifend. Donec rutrum leo sapien, eget mollis nisl bibendum vitae. Nam rhoncus scelerisque sem, a consequat nibh eleifend vel. Pellentesque posuere pulvinar ipsum id euismod. Suspendisse potenti. In quis justo dignissim, molestie lacus eget, varius felis. Mauris quam ex, finibus eu nulla nec, congue pellentesque purus. Nam gravida scelerisque tristique. Fusce at urna ut arcu sagittis.'),
('dd87128f-8421-4912-a88f-eb40e4cde1b5', 'c67fc6f1-d219-4bcd-8921-f8117ab6169a', 'tt0000002', 7.5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu lectus magna. Quisque eget ullamcorper libero. Praesent condimentum lacus velit, eu commodo orci porttitor a. Ut elit sem, ultrices vel magna nec, pulvinar lacinia erat. Donec ipsum ipsum, porta facilisis fringilla nec, semper quis ligula. Aenean at vestibulum tortor. Sed ac fermentum nisi. Suspendisse mollis posuere rhoncus. Suspendisse vel mauris in est interdum faucibus vitae at est. Maecenas consequat iaculis viverra. Proin ante arcu, laoreet.');

create table UserFollows (
    userId varchar(255) not null,
    followsUserId varchar(255) not null,
    primary key (userId, followsUserId),
    foreign key (userId) references Users(userId),
    foreign key (followsUserId) references Users(userId),
    -- users cannot follow themselves
    constraint columns_cannot_equal check (userId <> followsUserId)
);

-- jsmith follows mjane and pacman
-- mjane follows jsmith and pacman
-- pacman follows jsmith
INSERT INTO `UserFollows` (`userId`, `followsUserId`) VALUES
('bcab1d5d-e34d-487f-bc67-493335499b07', '601876bb-8b8b-4558-8a79-e9d70ff76b46'),
('bcab1d5d-e34d-487f-bc67-493335499b07', 'c67fc6f1-d219-4bcd-8921-f8117ab6169a'),
('601876bb-8b8b-4558-8a79-e9d70ff76b46', 'bcab1d5d-e34d-487f-bc67-493335499b07'), 
('601876bb-8b8b-4558-8a79-e9d70ff76b46', 'c67fc6f1-d219-4bcd-8921-f8117ab6169a'),
('c67fc6f1-d219-4bcd-8921-f8117ab6169a', 'bcab1d5d-e34d-487f-bc67-493335499b07');

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

INSERT INTO `WatchList` (`listId`, `userId`, `listName`) VALUES 
('a7b7f9b9-1d55-4d2c-8c0c-0a7b6d8e1c0a', 'bcab1d5d-e34d-487f-bc67-493335499b07', 'Untitled list'),
('f7e3c1b9-7d9b-4c5e-9d1c-0a7b6d8e1c0a', '601876bb-8b8b-4558-8a79-e9d70ff76b46', "mjane's favorites"),
('b7c9f9b9-1d55-4d2c-8c0c-0a7b6d8e1c0a', 'c67fc6f1-d219-4bcd-8921-f8117ab6169a', "pacman's watchlist");

create table WatchListItem (
    listId varchar(255) not null,
    tconst varchar(255) not null,
    primary key (listId, tconst),
    foreign key (listId) references WatchList(listId),
    foreign key (tconst) references TitleBasics(tconst)
);

INSERT INTO `WatchListItem` (`listId`, `tconst`) VALUES
('a7b7f9b9-1d55-4d2c-8c0c-0a7b6d8e1c0a', 'tt0000001'),
('a7b7f9b9-1d55-4d2c-8c0c-0a7b6d8e1c0a', 'tt0000002'),
('f7e3c1b9-7d9b-4c5e-9d1c-0a7b6d8e1c0a', 'tt0000003'),
('f7e3c1b9-7d9b-4c5e-9d1c-0a7b6d8e1c0a', 'tt0000004'),
('b7c9f9b9-1d55-4d2c-8c0c-0a7b6d8e1c0a', 'tt0000005');

show tables;
