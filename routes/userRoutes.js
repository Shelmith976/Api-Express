const router = require('express').Router();

const { getUsers, getUser, login, create } = require('../controllers/usersControllers');

router.get('/', getUsers)

router.get('/user/:email', getUser)

router.post('/login', login)
router.post('/createuser', create)

module.exports = {router}