// Controllers.
const Vote = require('../models/Vote')
const Song = require('../models/Song')


module.exports = {
    async createVote(req, res) {
        const { nickname, songs } = req.body

        await Vote.create({nickname, songs}, (err, vote) => {
            if (err) {
                // TODO: Send the error with the message.
                return res.status(500).send("Error: Couldn't save vote.")
            }

            return res.status('201').json({ok: 'OK'})
        })
    },


    async getTop5(req, res) {
        const top5Ids = await Vote.aggregate([
            { $unwind: "$songs" },
            { $group: {_id: {song: "$songs"}, votes: {$sum: 1}}},
            { $project: {_id: 0, song: "$_id.song", votes: "$votes"} },
            { $sort: {votes: -1}},
            { $limit: 5 }
        ], (err, docs) => {
            if (err) {
                // TODO: Send the error to the user.
                return null
            }
            return docs
        })

        if (top5Ids) {
            const ids = top5Ids.map(x => x.song)
            const top5Songs = await Song.find({_id: {$in: ids}}, {_id: 1, name: 1, artists: 1}, (err, docs) => {
                if (err) {
                    // TODO: Send the error to the user.
                    return null
                }

                return docs
            })

            if (top5Songs) {
                const users = await Vote.aggregate([
                    {$unwind: "$songs"},
                    {$match: {songs: {$in: ids}}},
                    {$group: {_id: "$nickname", songs: {$addToSet: "$songs"}}},
                    {$project: {nickname: "$_id", songs: {$size: "$songs"}}},
                    {$sort: {songs: -1}},
                ], (err, docs) => {
                    if (err) {
                        return null
                    }

                    return docs
                })

                const top5 = top5Ids.map(x => {
                    const { name, _id, artists } = top5Songs.filter(y => x.song == y._id)[0]

                    return {name, _id, artists, votes: x.votes}
                })

                if (users) {
                    return res.json({top5, users})
                }
            }
        }

        // TODO: Send the error with the message.
        return res.status(500).send("Error: Couldn't get Top5.")
    }
}