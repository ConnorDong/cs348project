Utilities for downloading and processing the IMDB dataset.

# Download the dataset

To download the [IMDB dataset](https://www.imdb.com/interfaces/), run the script
```
source get_data.sh
```
This will download the raw dataset in the `./raw` directory. 

# Process the data for SQL tables

The raw dataset is not normalized for SQL tables (e.g. some columns are multivalued, which we can split into separate tables). We created a Python script `process_data.py` which performs some data preprocessing before inserting into SQL tables.

To run it, first make sure you have the Python dependencies, run 
```
pip3 install -r requirements.txt
```

Run the data processing script:
```
python3 process_data.py
```
The processed data will be in the `./processed` directory.