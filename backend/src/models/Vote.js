// Models.

const mongoose = require('mongoose')

const VoteSchema = new mongoose.Schema({
    nickname: String,
    songs: Array,
    date: {type: Date, default: Date.now} // Data do voto.
}, {
    versionKey: false
})

module.exports = mongoose.model('Vote', VoteSchema)