-- NOTE: Please replace all occurrences of "/MY/ABSOLUTE/PATH/TO/" path in the LOCAL INFILE commands to the absolute path to the data/processed directory on your system.
-- There is no way in MySQL to do a variable path so you must hardcode the path (https://stackoverflow.com/a/41359626)

-- need to set this or else you get this error
-- https://stackoverflow.com/questions/59993844/error-loading-local-data-is-disabled-this-must-be-enabled-on-both-the-client
SET GLOBAL local_infile=1;

LOAD DATA 
	LOCAL INFILE '/home/leungjch/Documents/repos/cs348project/data/processed/nameBasics.tsv' 
    INTO TABLE NameBasics
    IGNORE 1 LINES;

LOAD DATA 
	LOCAL INFILE '/home/leungjch/Documents/repos/cs348project/data/processed/titleBasics.tsv' 
    INTO TABLE TitleBasics
    IGNORE 1 LINES;

LOAD DATA 
	LOCAL INFILE '/home/leungjch/Documents/repos/cs348project/data/processed/titleRatings.tsv' 
    INTO TABLE TitleRatings
    IGNORE 1 LINES;

LOAD DATA 
	LOCAL INFILE '/home/leungjch/Documents/repos/cs348project/data/processed/genres.tsv' 
    INTO TABLE Genres
    IGNORE 1 LINES;

INSERT INTO `GenreInfo` (`genre`, `description`) VALUES
('Documentary', 'A documentary is a type of film that focuses on real-life events, people, or situations. Documentaries can take many different forms, from investigative journalism to personal memoirs, and often seek to educate or inform the audience on a particular topic. They typically use archival footage, interviews, and other non-fictional elements to convey their message and make a case for their subject.'),
('Short', 'Short films are a category of movies that are typically under 40 minutes in length. They can be fictional or non-fictional and are often used to showcase the talent of new or emerging filmmakers. Short films are typically more experimental in nature than full-length movies and can cover a wide range of topics, from comedy to drama to horror.'),
('Animation', 'Animation is a technique used to create the illusion of movement in a series of static images. Animated movies can be hand-drawn or computer-generated and can cover a wide range of styles, from traditional cartoons to more realistic depictions. Animation can be used to tell any type of story, and has been used to create some of the most beloved movies of all time.'),
('Comedy', 'A comedy is a type of movie that is intended to make people laugh. Comedies can take many different forms, from slapstick humor to witty satire. They can cover any type of topic, from romance to politics, and often use humor to convey a particular message or perspective.'),
('Romance', 'A romance movie is a type of film that focuses on a romantic relationship between two people. These films can be light-hearted and comedic or serious and emotional, depending on the story and tone. Romance movies often explore themes of love, passion, and connection, and can be a powerful tool for exploring the human condition.'),
('Sport', 'Sports movies are a category of film that focus on a particular sport or athletic competition. These movies can cover a wide range of topics, from the personal struggles of individual athletes to the dynamics of team sports. Sports movies often use the drama and tension of competition to explore larger themes of perseverance, determination, and success.'),
('News', 'News movies are a type of film that focuses on current events and news stories. These movies can cover a wide range of topics, from politics to social justice issues, and often use investigative journalism to provide a deeper understanding of the issues at hand. News movies can be powerful tools for educating and informing audiences about the world around them.'),
('Drama', 'A drama is a type of movie that explores serious and often emotional themes, often with complex characters and a focus on character development. These films can cover a wide range of topics, from family dynamics to social issues to personal struggles. Drama movies often use nuanced performances and powerful storytelling to create a deeper understanding of the human experience.'),
('Fantasy', 'A fantasy film is a type of film that takes place in an imaginary world. It often features supernatural or magical elements, such as dragons, wizards, and other mythical creatures. Fantasy films can be epic in scope, with elaborate costumes and sets, or they can be more intimate and character-driven. They often explore themes of heroism, adventure, and self-discovery.'),
('Horror', 'A horror film is a type of film that is designed to scare and terrify the audience. It often features supernatural or monstrous elements, such as ghosts, zombies, or vampires. Horror films can be intense and graphic, or more atmospheric and suspenseful. They often explore themes of fear, death, and the unknown.'),
('Biography', 'A biographical film is a type of film that tells the story of a real-life person or historical figure. It often focuses on their personal life and achievements, and can be set in any time period. Biographical films can be inspiring and educational, and can provide insight into important historical events and figures.'),
('Music', 'A music film is a type of film that is centered around music, musicians, and the music industry. It can be a fictional story, or a documentary-style film that explores the history of a particular music genre or artist. Music films can be uplifting and inspirational, and often feature memorable musical performances.'),
('War', 'A war film is a type of film that focuses on the events and experiences of soldiers and civilians during wartime. War films can be set in any time period, and can cover a wide range of conflicts, from World War II to modern-day conflicts in the Middle East. They often explore themes of heroism, sacrifice, and the human cost of war.'),
('Crime', 'A crime film is a type of film that focuses on criminal activity and the criminal underworld. Crime films can be fictional or based on true events, and often feature complex characters and intricate plotlines. They often explore themes of justice, morality, and the consequences of criminal activity.'),
('Western', 'A Western film is a type of film that is set in the American West during the late 19th century. It typically features cowboys, outlaws, and lawmen, and often explores themes of honor, justice, and revenge. Westerns can be epic in scope, with sweeping landscapes and large-scale action sequences, or they can be more intimate character studies.'),
('Family', ' A family film is a type of film that is designed to appeal to viewers of all ages. Family films can be animated or live-action, and often feature themes of love, friendship, and the importance of family. They can be entertaining and lighthearted, or they can explore more serious topics in a way that is appropriate for young viewers.'),
('Adventure', 'An adventure film is a type of film that is centered around a thrilling and often dangerous journey or quest. Adventure films can be set in any time period or location, and can cover a wide range of subject matter, from treasure hunting to survival in the wilderness. They often explore themes of bravery, resourcefulness, and self-discovery.'),
('Action', 'An action film is a type of film that features high-energy and often explosive action sequences. Action films can be set in any time period or location, and often feature heroes who must overcome seemingly impossible odds to save the day. They often explore themes of heroism, danger, and excitement.'),
('History', ' Historical films can be fictional or based on true events, and often feature detailed and accurate depictions of historical settings and characters. They can be informative and educational, and often explore important themes and issues of the time period in which they are set.'),
('Mystery', ' A mystery film is a type of film that is centered around a puzzle or problem that needs to be solved. It often features a detective or investigator who must use their intellect and deductive reasoning to solve the mystery. Mystery films can be thrilling and suspenseful, and often explore themes of deception, betrayal, and the unknown.'),
('Sci-Fi', 'A science fiction film is a type of film that is set in a futuristic or alternate world that is based on science and technology. It often features advanced technologies, extraterrestrial life, and other futuristic concepts. Science fiction films can be thought-provoking and imaginative, and often explore themes of humanity, identity, and the future of civilization.'),
('Musical', 'A musical film is a type of film that is centered around music, song, and dance. It often features characters breaking into song and dance in the middle of a scene, and can be either fictional or based on real-life events. Musical films can be entertaining and uplifting, and often explore themes of love, friendship, and the power of music to bring people together.'),
('Thriller', 'A thriller film is a type of film that is designed to keep the audience on the edge of their seat. It often features suspenseful and intense plotlines, and can be centered around crime, espionage, or other high-stakes situations. Thriller films can be gripping and exciting, and often explore themes of danger, fear, and the human psyche.');

LOAD DATA 
	LOCAL INFILE '/home/leungjch/Documents/repos/cs348project/data/processed/characters.tsv' 
    INTO TABLE Portrays
    IGNORE 1 LINES;

LOAD DATA 
	LOCAL INFILE '/home/leungjch/Documents/repos/cs348project/data/processed/directors.tsv' 
    INTO TABLE Directors
    IGNORE 1 LINES;

LOAD DATA 
	LOCAL INFILE '/home/leungjch/Documents/repos/cs348project/data/processed/writers.tsv' 
    INTO TABLE Writers
    IGNORE 1 LINES;

INSERT INTO `Users` (`userId`, `username`, `password`) VALUES
('bcab1d5d-e34d-487f-bc67-493335499b07', 'jsmith', 'test123'),
('601876bb-8b8b-4558-8a79-e9d70ff76b46', 'mjane', 'helloworld'),
('c67fc6f1-d219-4bcd-8921-f8117ab6169a', 'pacman', 'helloworld123'),
('00000000-00000000-00000000-00000000', 'myadmin', 'password');

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

-- Fancy feature: RBAC
-- Inserting sample permissions
INSERT INTO Permissions (permissionId, permissionName, description)
VALUES ('100', 'view_data', 'View movie data'),
       ('101', 'modify_reviews', 'Add and remove own reviews'),
       ('102', 'modify_watchlists', 'Add and remove own watch lists'),
       ('103', 'view_admin_panel', 'View admin panel');

INSERT INTO Roles (roleId, name)
VALUES ('1', 'Admin'), ('2', 'Viewer');

-- Assign permissions to Viewer role
INSERT INTO RolePermissions (roleId, permissionId)
VALUES ('1', '100'), ('1', '101'), ('1', '102');

-- Assign permissions to Admin role
INSERT INTO RolePermissions (roleId, permissionId)
VALUES ('2', '100'), ('2', '101'), ('2', '102'), ('2', '103');

-- -- Assign viewer role to regular users
-- -- These are already done by the default role trigger so not necessary
-- INSERT INTO UserRoles (userId, roleId)
-- VALUES ('bcab1d5d-e34d-487f-bc67-493335499b07', '1'),
-- 	   ('601876bb-8b8b-4558-8a79-e9d70ff76b46', '1'),
--        ('c67fc6f1-d219-4bcd-8921-f8117ab6169a', '1');

-- Assign admin role to the admin user
INSERT INTO UserRoles (userId, roleId)
VALUES ('00000000-00000000-00000000-00000000', '2');
