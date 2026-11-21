export function isOpenNow(hoursString, now = new Date()) {
  if (!hoursString || typeof hoursString !== 'string') return false;

  const [openTime, closeTime] = hoursString.split('-');
  if (!openTime || !closeTime) return false;

  const [openH, openM] = openTime.split(':').map(Number);
  const [closeH, closeM] = closeTime.split(':').map(Number);

  if (isNaN(openH) || isNaN(openM) || isNaN(closeH) || isNaN(closeM)) return false;

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}
