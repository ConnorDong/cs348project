
drop database db;
create database db;
use db;


SET GLOBAL local_infile=1;

   
SHOW GLOBAL VARIABLES LIKE 'local_infile';


-- TitleRatings
create table TitleRatings (
	tconst varchar(9) primary key,
    averageRating double,
    numVotes numeric
);
LOAD DATA 
	LOCAL INFILE '/home/leungjch/Documents/repos/cs348project/data/processed/titleRatings.tsv' 
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
	LOCAL INFILE '/home/leungjch/Documents/repos/cs348project/data/processed/nameBasics.tsv' 
    INTO TABLE NameBasics
    IGNORE 1 LINES;
    

-- Professions
create table Professions (
	nconst varchar(9),
	profession text
);
LOAD DATA 
	LOCAL INFILE '/home/leungjch/Documents/repos/cs348project/data/processed/professions.tsv' 
    INTO TABLE Professions
    IGNORE 1 LINES;

-- KnownFor
create table KnownFor (
	nconst varchar(255),
	tconst varchar(255),
    primary key (nconst, tconst)
);
LOAD DATA 
	LOCAL INFILE '/home/leungjch/Documents/repos/cs348project/data/processed/knownFor.tsv' 
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
	LOCAL INFILE '/home/leungjch/Documents/repos/cs348project/data/processed/titleBasics.tsv' 
    INTO TABLE TitleBasics
    IGNORE 1 LINES;
    
select * from TitleBasics;
-- 


-- Genres
create table Genres (
	tconst varchar(255),
    genre varchar(255),
    primary key (tconst, genre)
);
LOAD DATA 
	LOCAL INFILE '/home/leungjch/Documents/repos/cs348project/data/processed/genres.tsv' 
    INTO TABLE Genres
    IGNORE 1 LINES;
    
select * from Genres;

-- Genres
create table Portrays (
	tconst varchar(255),
    nconst varchar(255),
    portray varchar(255),
    primary key (tconst, nconst, portray)
);
LOAD DATA 
	LOCAL INFILE '/home/leungjch/Documents/repos/cs348project/data/processed/characters.tsv' 
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
	LOCAL INFILE '/home/leungjch/Documents/repos/cs348project/data/processed/titlePrincipals.tsv' 
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
	LOCAL INFILE '/home/leungjch/Documents/repos/cs348project/data/processed/directors.tsv' 
    INTO TABLE Directors
    IGNORE 1 LINES;
    
select * from Directors;
-- 

-- Genres
create table Writers (
	tconst varchar(255),
    nconst varchar(255),
    primary key (tconst, nconst)
);
LOAD DATA 
	LOCAL INFILE '/home/leungjch/Documents/repos/cs348project/data/processed/writers.tsv' 
    INTO TABLE Writers
    IGNORE 1 LINES;

show tables;

