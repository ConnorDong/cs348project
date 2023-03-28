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
natural inner join TitleRatings
where TitleBasics.tconst > “tt0000000”
order by TitleBasics.tconst;

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

select userId, username from Users
    where userId > '601876bb-8b8b-4558-8a79-e9d70ff76b46'
    order by userId
    limit 5;

select userId, username from Users
    where userId='601876bb-8b8b-4558-8a79-e9d70ff76b46';
   
select u.userId, u.username from UserFollows as uf
    join Users as u on uf.userId=u.userId
    where followsUserId='601876bb-8b8b-4558-8a79-e9d70ff76b46';
   
select u.userId, u.username from UserFollows as uf
    join Users as u on uf.followsUserId=u.userId
    where uf.userId='601876bb-8b8b-4558-8a79-e9d70ff76b46';

select tb.tconst, primaryTitle, reviewId, userId, rating, description  from UserReview
    join TitleBasics as tb on UserReview.tconst=tb.tconst
    where userId='601876bb-8b8b-4558-8a79-e9d70ff76b46';

select * from WatchList
    where userId='601876bb-8b8b-4558-8a79-e9d70ff76b46';

START TRANSACTION;
    insert into WatchList
    values ('02406dbb-ec32-4454-803e-6c8ada55786c', '601876bb-8b8b-4558-8a79-e9d70ff76b46', 'Test List Name');
COMMIT;

delete from WatchList
    where listId='02406dbb-ec32-4454-803e-6c8ada55786c';

insert into UserFollows values ('c67fc6f1-d219-4bcd-8921-f8117ab6169a', '601876bb-8b8b-4558-8a79-e9d70ff76b46');

delete from UserFollows
    where userId='c67fc6f1-d219-4bcd-8921-f8117ab6169a' and followsUserId='601876bb-8b8b-4558-8a79-e9d70ff76b46';

select distinct genre from Genres;

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
    natural inner join TitleRatings
    natural inner join Genres
    where TitleBasics.tconst > 'tt0000001' and genre = 'Animation'
    order by TitleBasics.tconst;
