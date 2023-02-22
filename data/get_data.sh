#!/bin/bash

# download dataset
wget https://datasets.imdbws.com/name.basics.tsv.gz
wget https://datasets.imdbws.com/title.akas.tsv.gz
wget https://datasets.imdbws.com/title.basics.tsv.gz
wget https://datasets.imdbws.com/title.crew.tsv.gz
wget https://datasets.imdbws.com/title.episode.tsv.gz
wget https://datasets.imdbws.com/title.principals.tsv.gz
wget https://datasets.imdbws.com/title.ratings.tsv.gz

mkdir -p raw
mkdir -p processed
for f in *.tsv.gz
do
	# unzip
	gunzip -c $f > raw/${f%.gz}
	rm $f
done
