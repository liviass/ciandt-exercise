// Routes.

const { Router } = require('express')
const SongController = require('./controllers/SongController')
const VoteController = require('./controllers/VoteController')
const routes = Router()

routes.get('/songs/list', SongController.getSongsList)
routes.post('/votes/add', VoteController.createVote)
routes.get('/votes/top5', VoteController.getTop5)

module.exports = routes