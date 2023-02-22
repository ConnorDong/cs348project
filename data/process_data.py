# python script for processing the raw .tsv files for SQL tables

import pandas as pd
import numpy as np
import gc

def splitColumnToList(df, name, sep=','):
    df = df[df[name].notna()]
    isna = df[name].isna()
    df.loc[isna, name] = ""


    return df[name].apply(lambda x: x.split(sep))

class ProcessData:
    def getNameBasics(self, nrows=None):
        # --------------------------------------------------------------------------------
        # process NameBasics
        nameBasics = pd.read_csv("raw/name.basics.tsv",
            sep='\t', 
            nrows=nrows,
            na_values="\\N")

        # cast multivalued attributes from string to list
        nameBasics['knownForTitles'] = splitColumnToList(nameBasics, 'knownForTitles')
        nameBasics['primaryProfession'] = splitColumnToList(nameBasics, 'primaryProfession')

        # create the KnownFor and Professions tables
        # convert multivalued attributes into their own relation
        knownFor = nameBasics[['nconst', 'knownForTitles']].explode('knownForTitles').dropna()
        professions = nameBasics[['nconst', 'primaryProfession']].explode('primaryProfession').dropna()

        # rename columns
        knownFor.columns = ['nconst', 'tconst']
        professions.columns = ['nconst', 'profession']

        # delete the multivalued attributes from NameBasics
        nameBasics = nameBasics.drop(columns=['knownForTitles', 'primaryProfession'])


        knownFor.dropna()
        professions.fillna("\\N")
        nameBasics.fillna("\\N")

        # export
        knownFor.to_csv("processed/knownFor.tsv", sep='\t', index=False, na_rep="\\N")
        professions.to_csv("processed/professions.tsv", sep='\t', index=False, na_rep="\\N")
        nameBasics.to_csv("processed/nameBasics.tsv", sep='\t', index=False, na_rep="\\N")

        print(nameBasics.head())
        print(knownFor.head())
        print(professions.head())

        # --------------------------------------------------------------------------------

    # --------------------------------------------------------------------------------

    def getTitleBasics(self, nrows=None):
        titleBasics = pd.read_csv("raw/title.basics.tsv",
            sep='\t',
            nrows=nrows,
            na_values="\\N"
            )

        # cast multivalued attributes from string to list
        titleBasics['genres'] = splitColumnToList(titleBasics, 'genres')

        # create the KnownFor and Professions tables
        # convert multivalued attributes into their own relation
        genres = titleBasics[['tconst', 'genres']].explode('genres')

        titleBasics = titleBasics.drop(columns=['genres'])
        genres.columns = ['tconst', 'genre']

        titleBasics = titleBasics.replace(r'^\s*$', np.nan, regex=True)

        genres.fillna("\\N")
        titleBasics.fillna("\\N")

        print("Done")
        print(titleBasics.head())

        titleBasics.to_csv("processed/titleBasics.tsv", sep='\t', index=False, na_rep='\\N')
        genres.to_csv("processed/genres.tsv", sep='\t', index=False, na_rep='\\N')

        print(titleBasics.head())
        print(genres.head())

    def getTitleRatings(self, nrows=None):
        titleRatings = pd.read_csv("raw/title.ratings.tsv",
            sep='\t',
            nrows=nrows,
            na_values="\\N")

        print(titleRatings.head())
        titleRatings.fillna("\\N")
        titleRatings.to_csv("processed/titleRatings.tsv", sep='\t', index=False, na_rep="\\N")
    def getTitleCrew(self, nrows=None):
        titleCrew = pd.read_csv("raw/title.crew.tsv",
            sep='\t',
            nrows=nrows,
            na_values="\\N")
        print(titleCrew.head())
        titleCrew['directors'] = splitColumnToList(titleCrew, 'directors')
        titleCrew['writers'] = splitColumnToList(titleCrew, 'writers')

        directors = titleCrew[['tconst', 'directors']].explode('directors').dropna()
        directors.columns = ["tconst", "nconst"]

        writers = titleCrew[['tconst', 'writers']].explode('writers').dropna()
        writers.columns = ["tconst", "nconst"]

        print(titleCrew.head())
        print(directors.head())
        print(writers.head())

        directors.fillna("\\N")
        writers.fillna("\\N")

        directors.to_csv("processed/directors.tsv", sep='\t', index=False, na_rep="\\N")
        writers.to_csv("processed/writers.tsv", sep='\t', index=False, na_rep="\\N")

    def getTitlePrincipals(self, nrows=None):
        titlePrincipals = pd.read_csv("raw/title.principals.tsv",
            sep='\t',
            nrows=nrows,
            na_values="\\N")
        # titlePrincipals['characters']  = splitColumnToList(titlePrincipals, 'characters')
        print(titlePrincipals.head())
        print("HI")

        characters = titlePrincipals[['tconst', 'nconst', 'characters']].explode('characters').dropna()
        titlePrincipals = titlePrincipals.drop(columns=['characters'])
        print(characters.head())
        print(titlePrincipals.head())

        characters.fillna("\\N")
        titlePrincipals.fillna("\\N")

        characters.to_csv("processed/characters.tsv", sep='\t', index=False, na_rep="\\N")
        titlePrincipals.to_csv("processed/titlePrincipals.tsv", sep='\t', index=False, na_rep="\\N")


if __name__ == "__main__":
    p = ProcessData()
    MAX_ROWS=100
    p.getNameBasics(MAX_ROWS)
    p.getTitleBasics(MAX_ROWS)
    p.getTitleRatings(MAX_ROWS)
    p.getTitleCrew(MAX_ROWS)
    p.getTitlePrincipals(MAX_ROWS)
