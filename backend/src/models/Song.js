const mongoose = require('mongoose')

const SongSchema = new mongoose.Schema({
    name: String,
    artists: String,
    genre: String,
    danceability: Number,
    energy: Number,
    key: Number,
    loudness: Number,
    mode: Number,
    speechiness: Number,
    acousticness: Number,
    instrumentalness: Number,
    liveness: Number,
    valence: Number,
    tempo: Number,
    duration_ms: Number,
    time_signature: Number
}, {
    versionKey: false
})

module.exports = mongoose.model('Song', SongSchema)