const gachaRepository = require('./gacha-repository');

const PRIZES = [
  { name: 'Emas 10 gram', quota: 1 },
  { name: 'Smartphone X', quota: 5 },
  { name: 'Smartwatch Y', quota: 10 },
  { name: 'Voucher Rp100.000', quota: 100 },
  { name: 'Pulsa Rp50.000', quota: 500 },
];

async function playGacha(userId, userName) {
  const count = await gachaRepository.countUserGachaToday(userId);
  if (count >= 5) throw new Error('Quota gacha harian habis (Maks 5x)');

  const prizeCounts = await Promise.all(
    PRIZES.map(async (p) => ({
      name: p.name,
      won: await gachaRepository.countPrizeWinners(p.name),
      quota: p.quota,
    }))
  );
  const available = prizeCounts
    .filter(({ won, quota }) => won < quota)
    .map(({ name }) => name);

  let winPrize = 'Zonk';
  if (Math.random() < 0.3 && available.length > 0) {
    winPrize = available[Math.floor(Math.random() * available.length)];
  }

  return gachaRepository.createGachaLog(userId, userName, winPrize);
}

async function getRemainingQuotas() {
  return Promise.all(
    PRIZES.map(async (p) => ({
      hadiah: p.name,
      sisa: p.quota - (await gachaRepository.countPrizeWinners(p.name)),
    }))
  );
}

function maskName(name) {
  if (!name) return '****';
  const parts = name.split(' ');

  return parts
    .map(
      (p) =>
        p[0] +
        '*'.repeat(Math.max(0, p.length - 2)) +
        (p.length > 1 ? p[p.length - 1] : '')
    )
    .join(' ');
}

module.exports = {
  playGacha,
  getRemainingQuotas,
  maskName,
};
