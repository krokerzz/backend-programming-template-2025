const express = require('express');
const gachaController = require('./gacha-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/gacha', route);

  route.post('/', gachaController.handleGacha);
  route.get('/history/:userId', gachaController.getHistory);
  route.get('/status', gachaController.getStatus);
  route.get('/winners', gachaController.getWinners);
};
