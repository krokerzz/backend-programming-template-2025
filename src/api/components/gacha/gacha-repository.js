const Gacha = require('../../../models/gacha');

async function countUserGachaToday(userId) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return Gacha.countDocuments({
    userId,
    createdAt: { $gte: start, $lte: end },
  });
}

async function countPrizeWinners(prizeName) {
  return Gacha.countDocuments({ prizeName });
}

async function createGachaLog(userId, userName, prizeName) {
  return Gacha.create({ userId, userName, prizeName });
}

async function getHistory(userId) {
  return Gacha.find({ userId }).sort({
    createdAt: -1,
  });
}

async function getAllWinners() {
  return Gacha.find({ prizeName: { $ne: 'Zonk' } }).sort({
    createdAt: -1,
  });
}

module.exports = {
  countUserGachaToday,
  countPrizeWinners,
  createGachaLog,
  getHistory,
  getAllWinners,
};
