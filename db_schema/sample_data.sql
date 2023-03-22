INSERT INTO `TitleBasics` (`tconst`, `titleType`, `primaryTitle`, `originalTitle`, `isAdult`, `startYear`, `endYear`, `runtimeMinutes`) VALUES
('tt0000001', 'short', 'Carmencita', 'Carmencita', 0, 1894, NULL, 1),
('tt0000002', 'short', 'Le clown et ses chiens', 'Le clown et ses chiens', 0, 1892, NULL, 5),
('tt0000003', 'short', 'Pauvre Pierrot', 'Pauvre Pierrot', 0, 1892, NULL, 4),
('tt0000004', 'short', 'Un bon bock', 'Un bon bock', 0, 1892, NULL, 12),
('tt0000005', 'short', 'Blacksmith Scene', 'Blacksmith Scene', 0, 1893, NULL, 1);

INSERT INTO `NameBasics` (`nconst`, `primaryName`, `birthYear`, `deathYear`) VALUES
('nm0000001', 'Fred Astaire', 1899, 1987),
('nm0000002', 'Lauren Bacall', 1924, 2014),
('nm0000003', 'Brigitte Bardot', 1934, NULL),
('nm0000004', 'John Belushi', 1949, 1982),
('nm0000005', 'Ingmar Bergman', 1918, 2007),
('nm0000006', 'Ingrid Bergman', 1915, 1982),
('nm0000007', 'Humphrey Bogart', 1899, 1957),
('nm0000008', 'Marlon Brando', 1924, 2004),
('nm0000009', 'Richard Burton', 1925, 1984),
('nm0000010', 'James Cagney', 1899, 1986),
('nm0000011', 'Gary Cooper', 1901, 1961),
('nm0000012', 'Bette Davis', 1908, 1989),
('nm0000013', 'Doris Day', 1922, 2019),
('nm0000014', 'Olivia de Havilland', 1916, 2020),
('nm0000015', 'James Dean', 1931, 1955),
('nm0000016', 'Georges Delerue', 1925, 1992),
('nm0000017', 'Marlene Dietrich', 1901, 1992),
('nm0000018', 'Kirk Douglas', 1916, 2020),
('nm0000019', 'Federico Fellini', 1920, 1993),
('nm0000020', 'Henry Fonda', 1905, 1982);

INSERT INTO `TitleRatings` (`tconst`, `averageRating`, `numVotes`) VALUES
('tt0000001', 5.7, 1957),
('tt0000002', 5.8, 263),
('tt0000003', 6.5, 1791),
('tt0000004', 5.6, 179),
('tt0000005', 6.2, 2594);

INSERT INTO `Genres` (`tconst`, `genre`) VALUES
('tt0000001', 'Documentary'),
('tt0000001', 'Short'),
('tt0000002', 'Animation'),
('tt0000002', 'Short'),
('tt0000003', 'Animation'),
('tt0000003', 'Comedy'),
('tt0000003', 'Romance'),
('tt0000004', 'Animation'),
('tt0000004', 'Short'),
('tt0000005', 'Comedy'),
('tt0000005', 'Short');

INSERT INTO `Directors` (`tconst`, `nconst`) VALUES
('tt0000001', 'nm0000001'),
('tt0000002', 'nm0000002'),
('tt0000003', 'nm0000002'),
('tt0000004', 'nm0000002'),
('tt0000005', 'nm0000001');

INSERT INTO `Writers` (`tconst`, `nconst`) VALUES
('tt0000001', 'nm0000003'),
('tt0000001', 'nm0000004'),
('tt0000002', 'nm0000005'),
('tt0000003', 'nm0000005'),
('tt0000004', 'nm0000006'),
('tt0000005', 'nm0000007');

INSERT INTO `Portrays` (`tconst`, `nconst`, `portray`) VALUES
('tt0000001', 'nm0000008', '\"[\"\"Self\"\"]\"'),
('tt0000005', 'nm0000015', '\"[\"\"Blacksmith\", \"Whitesmith\"\"]\"'),
('tt0000005', 'nm0000016', '\"[\"\"Assistant\"\"]\"');

INSERT INTO `Users` (`userId`, `username`, `password`) VALUES
('bcab1d5d-e34d-487f-bc67-493335499b07', 'jsmith', 'test123'),
('601876bb-8b8b-4558-8a79-e9d70ff76b46', 'mjane', 'helloworld'),
('c67fc6f1-d219-4bcd-8921-f8117ab6169a', 'pacman', 'helloworld123');

INSERT INTO `UserReview` (`reviewId`, `userId`, `tconst`, `rating`, `description`) VALUES
('7837bd50-b7ec-4d45-b66e-4932c378f078', 'bcab1d5d-e34d-487f-bc67-493335499b07', 'tt0000001', 9.6, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id laoreet felis, vitae eleifend metus. Quisque lacinia rutrum dolor ultrices blandit. Morbi mi lorem, fermentum ut lectus nec, ornare convallis felis. Ut in tristique purus, non auctor mi. Nunc ultrices ac augue nec sodales. Vivamus non risus ac purus lacinia luctus sed et purus. Cras porta, felis eget tincidunt aliquet, diam justo auctor elit, at tempus est orci et purus. Proin a lectus interdum libero.'),
('e135899c-075b-4471-b8d4-11c72d9abf24', '601876bb-8b8b-4558-8a79-e9d70ff76b46', 'tt0000002', 8.5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt suscipit turpis ut ullamcorper. Pellentesque dictum a quam a eleifend. Donec rutrum leo sapien, eget mollis nisl bibendum vitae. Nam rhoncus scelerisque sem, a consequat nibh eleifend vel. Pellentesque posuere pulvinar ipsum id euismod. Suspendisse potenti. In quis justo dignissim, molestie lacus eget, varius felis. Mauris quam ex, finibus eu nulla nec, congue pellentesque purus. Nam gravida scelerisque tristique. Fusce at urna ut arcu sagittis.'),
('dd87128f-8421-4912-a88f-eb40e4cde1b5', 'c67fc6f1-d219-4bcd-8921-f8117ab6169a', 'tt0000002', 7.5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu lectus magna. Quisque eget ullamcorper libero. Praesent condimentum lacus velit, eu commodo orci porttitor a. Ut elit sem, ultrices vel magna nec, pulvinar lacinia erat. Donec ipsum ipsum, porta facilisis fringilla nec, semper quis ligula. Aenean at vestibulum tortor. Sed ac fermentum nisi. Suspendisse mollis posuere rhoncus. Suspendisse vel mauris in est interdum faucibus vitae at est. Maecenas consequat iaculis viverra. Proin ante arcu, laoreet.');

-- jsmith follows mjane and pacman
-- mjane follows jsmith and pacman
-- pacman follows jsmith
INSERT INTO `UserFollows` (`userId`, `followsUserId`) VALUES
('bcab1d5d-e34d-487f-bc67-493335499b07', '601876bb-8b8b-4558-8a79-e9d70ff76b46'),
('bcab1d5d-e34d-487f-bc67-493335499b07', 'c67fc6f1-d219-4bcd-8921-f8117ab6169a'),
('601876bb-8b8b-4558-8a79-e9d70ff76b46', 'bcab1d5d-e34d-487f-bc67-493335499b07'), 
('601876bb-8b8b-4558-8a79-e9d70ff76b46', 'c67fc6f1-d219-4bcd-8921-f8117ab6169a'),
('c67fc6f1-d219-4bcd-8921-f8117ab6169a', 'bcab1d5d-e34d-487f-bc67-493335499b07');

INSERT INTO `WatchList` (`listId`, `userId`, `listName`) VALUES 
('a7b7f9b9-1d55-4d2c-8c0c-0a7b6d8e1c0a', 'bcab1d5d-e34d-487f-bc67-493335499b07', 'Untitled list'),
('f7e3c1b9-7d9b-4c5e-9d1c-0a7b6d8e1c0a', '601876bb-8b8b-4558-8a79-e9d70ff76b46', "mjane's favorites"),
('b7c9f9b9-1d55-4d2c-8c0c-0a7b6d8e1c0a', 'c67fc6f1-d219-4bcd-8921-f8117ab6169a', "pacman's watchlist");

INSERT INTO `WatchListItem` (`listId`, `tconst`) VALUES
('a7b7f9b9-1d55-4d2c-8c0c-0a7b6d8e1c0a', 'tt0000001'),
('a7b7f9b9-1d55-4d2c-8c0c-0a7b6d8e1c0a', 'tt0000002'),
('f7e3c1b9-7d9b-4c5e-9d1c-0a7b6d8e1c0a', 'tt0000003'),
('f7e3c1b9-7d9b-4c5e-9d1c-0a7b6d8e1c0a', 'tt0000004'),
('b7c9f9b9-1d55-4d2c-8c0c-0a7b6d8e1c0a', 'tt0000005');