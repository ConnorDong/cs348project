CREATE DATABASE hello_world;

CREATE TABLE hello_world.persons (
    PersonID int,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
);

INSERT INTO hello_world.persons VALUES (1, 'Dong', 'Connor', 'Fergus', 'Waterloo');
