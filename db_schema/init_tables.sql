-- NOTE: Please replace all occurrences of "/MY/ABSOLUTE/PATH/TO/" path in the LOCAL INFILE commands to the absolute path to the data/processed directory on your system.
-- There is no way in MySQL to do a variable path so you must hardcode the path (https://stackoverflow.com/a/41359626)

drop database db;
create database db;
use db;

-- need to set this or else you get this error
-- https://stackoverflow.com/questions/59993844/error-loading-local-data-is-disabled-this-must-be-enabled-on-both-the-client
SET GLOBAL local_infile=1;


-- TitleRatings
create table TitleRatings (
	tconst varchar(9) primary key,
    averageRating double,
    numVotes numeric
);
LOAD DATA 
	LOCAL INFILE '/MY/ABSOLUTE/PATH/TO/data/processed/titleRatings.tsv' 
    INTO TABLE TitleRatings
    IGNORE 1 LINES;
select * from TitleRatings;

-- NameBasics
create table NameBasics (
	nconst varchar(9) primary key,
    primaryName varchar(255),
    birthYear integer,
    deathYear integer
);
LOAD DATA 
	LOCAL INFILE '/MY/ABSOLUTE/PATH/TO/data/processed/nameBasics.tsv' 
    INTO TABLE NameBasics
    IGNORE 1 LINES;
    

-- Professions
create table Professions (
	nconst varchar(9),
	profession text
);
LOAD DATA 
	LOCAL INFILE '/MY/ABSOLUTE/PATH/TO/data/processed/professions.tsv' 
    INTO TABLE Professions
    IGNORE 1 LINES;

-- KnownFor
create table KnownFor (
	nconst varchar(255),
	tconst varchar(255),
    primary key (nconst, tconst)
);
LOAD DATA 
	LOCAL INFILE '/MY/ABSOLUTE/PATH/TO/data/processed/knownFor.tsv' 
    INTO TABLE KnownFor
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
LOAD DATA 
	LOCAL INFILE '/MY/ABSOLUTE/PATH/TO/data/processed/titleBasics.tsv' 
    INTO TABLE TitleBasics
    IGNORE 1 LINES;
-- 


-- Genres
create table Genres (
	tconst varchar(255),
    genre varchar(255),
    primary key (tconst, genre)
);
LOAD DATA 
	LOCAL INFILE '/MY/ABSOLUTE/PATH/TO/data/processed/genres.tsv' 
    INTO TABLE Genres
    IGNORE 1 LINES;

-- Portrays
create table Portrays (
	tconst varchar(255),
    nconst varchar(255),
    portray varchar(255),
    primary key (tconst, nconst, portray)
);
LOAD DATA 
	LOCAL INFILE '/MY/ABSOLUTE/PATH/TO/data/processed/characters.tsv' 
    INTO TABLE Portrays
    IGNORE 1 LINES;
    

-- TitlePrincipals
create table TitlePrincipals (
	tconst varchar(255),
    ordering numeric,
    nconst varchar(255),
    category varchar(255),
    job varchar(255),
    primary key (tconst, nconst)
);
LOAD DATA 
	LOCAL INFILE '/MY/ABSOLUTE/PATH/TO/data/processed/titlePrincipals.tsv' 
    INTO TABLE TitlePrincipals
    IGNORE 1 LINES;
    
select * from TitlePrincipals;

-- Directors
create table Directors (
	tconst varchar(255),
    nconst varchar(255),
    primary key (tconst, nconst)
);
LOAD DATA 
	LOCAL INFILE '/MY/ABSOLUTE/PATH/TO/data/processed/directors.tsv' 
    INTO TABLE Directors
    IGNORE 1 LINES;
    
select * from Directors;
-- 

-- Writers
create table Writers (
	tconst varchar(255),
    nconst varchar(255),
    primary key (tconst, nconst)
);
LOAD DATA 
	LOCAL INFILE '/MY/ABSOLUTE/PATH/TO/data/processed/writers.tsv' 
    INTO TABLE Writers
    IGNORE 1 LINES;

show tables;

