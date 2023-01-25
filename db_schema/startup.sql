CREATE DATABASE hello_world;

CREATE TABLE Persons (
    PersonID int,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
);
Insert into persons values (1, 'Dong', 'Connor', 'Fergus', 'Waterloo')
SELECT * FROM hello_world.persons;