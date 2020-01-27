// Controllers.
const Song = require('../models/Song')

module.exports = {
    // Returns a list of all songs in the database.
    async getSongsList(req, res) {
        await Song.find({}, {_id: 1, name: 1, artists: 1}, function (err, songs) {
            if (err) {
                res.status(500).send("Error: Couldn't get songs.")
            }
            return res.json(songs)
        })
    }
}