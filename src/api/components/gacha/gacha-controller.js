const gachaService = require('./gacha-service');
const gachaRepository = require('./gacha-repository');

async function handleGacha(req, res) {
  try {
    const { userId, userName } = req.body;
    const result = await gachaService.playGacha(userId, userName);
    res.status(200).json({ message: 'Gacha Berhasil', data: result });
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
}

// Bonus 1 [cite: 20]
async function getHistory(req, res) {
  const data = await gachaRepository.getHistory(req.params.userId);
  res.status(200).json(data);
}

// Bonus 2 [cite: 21]
async function getStatus(req, res) {
  const data = await gachaService.getRemainingQuotas();
  res.status(200).json(data);
}

// Bonus 3 [cite: 22]
async function getWinners(req, res) {
  const data = await gachaRepository.getAllWinners();
  const masked = data.map((d) => {
    const plain = d.toObject();
    return {
      ...plain,
      userName: gachaService.maskName(plain.userName),
    };
  });

  res.status(200).json(masked);
}

module.exports = { handleGacha, getHistory, getStatus, getWinners };
