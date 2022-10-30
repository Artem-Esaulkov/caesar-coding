const router = require('express').Router();
const { postMessage, getMessage, getStats } = require('../controllers/message');

router.post('/encode', postMessage);
router.get('/decode/:message/:rot', getMessage);
router.get('/stats', getStats);

module.exports = router;
