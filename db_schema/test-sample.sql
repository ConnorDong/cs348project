select TitleBasics.tconst as titleId,
TitleBasics.primaryTitle as title,
TitleBasics.startYear as year,
TitleBasics.isAdult as adult,
TitleRatings.averageRating as ratings,
TitleRatings.numVotes as voteCount,
(Select GROUP_CONCAT(genre SEPARATOR ', ') from Genres
where Genres.tconst = titleId
group by tconst
) as genre
from TitleBasics
natural inner join TitleRatings;

start transaction;
insert into UserReview
   values ('5938b4ed-cd57-4e57-8a1b-d5b2b23764f4', '601876bb-8b8b-4558-8a79-e9d70ff76b46', 'tt0000001', 4, 'This was a great movie!');
   select @last_uuid as reviewId;
commit;

delete from UserReview
   where reviewId='5938b4ed-cd57-4e57-8a1b-d5b2b23764f4';

start transaction;
insert into Users VALUES (uuid(), 'test', 'password');
   select @last_uuid as userId;
commit;

select exists( select * from Users
   where username='test'
   and password='password') as loginSucceeded,
   (select userId from Users
   where username='test') as userId;

select TitleBasics.tconst as titleId,
TitleBasics.primaryTitle as title,
TitleBasics.startYear as year,
TitleBasics.isAdult as adult,
TitleRatings.averageRating as ratings,
TitleRatings.numVotes as voteCount,
(Select GROUP_CONCAT(genre SEPARATOR ', ') from Genres
where Genres.tconst = titleId
group by tconst
) as genre,
(Select GROUP_CONCAT(primaryName SEPARATOR ', ') from Directors
natural inner join NameBasics
where Directors.tconst = titleId
group by tconst
) as directors,
(Select GROUP_CONCAT(primaryName SEPARATOR ', ') from Writers
natural inner join NameBasics
where Writers.tconst = titleId
group by tconst
) as writers
from TitleBasics
natural inner join TitleRatings
where TitleBasics.tconst='tt0000001';

select reviewId, username, Round(rating, 1) as rating, description as comment from UserReview
   natural inner join Users
   where tconst='tt0000001';  
