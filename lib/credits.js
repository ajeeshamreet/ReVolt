const METAL_RATES = {
  gold: 8000,
  silver: 150,
  copper: 1.5,
};

const CONDITION_MULTIPLIER = {
  working: 1.0,
  damaged: 0.6,
};

export function pointsFor(device, condition = 'working') {
  if (!device) return 0;

  const multiplier = CONDITION_MULTIPLIER[condition] ?? 1.0;
  const base =
    (device.gold || 0) * METAL_RATES.gold +
    (device.silver || 0) * METAL_RATES.silver +
    (device.copper || 0) * METAL_RATES.copper;

  return Math.round(base * multiplier);
}
