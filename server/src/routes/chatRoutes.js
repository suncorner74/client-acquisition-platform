const express = require('express');
const router = express.Router();
const { chat, resetChat } = require('../controllers/chatController');

// POST /api/chat       — Send a message to Aria (Sunvix AI Assistant)
router.post('/', chat);

// POST /api/chat/reset — Clear the conversation session
router.post('/reset', resetChat);

module.exports = router;
