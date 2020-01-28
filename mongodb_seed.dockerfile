FROM mongo
COPY db_docs/spotify-top100-2018.json .

CMD mongoimport --host mongo --db radio_db --collection songs --type json --file spotify-top100-2018.json --jsonArray