import { useMemo } from 'react';
import { isOpenNow } from './isOpenNow';

export function useFacilityFilter(facilities, search, selectedChips) {
  return useMemo(() => {
    const q = search.trim().toLowerCase();
    const catChips = selectedChips.filter((c) => c !== 'Open now');
    const reqOpen = selectedChips.includes('Open now');

    return facilities.filter((f) => {
      if (q && !f.name.toLowerCase().includes(q) && !f.address.toLowerCase().includes(q)) {
        return false;
      }
      if (reqOpen && !isOpenNow(f.hours)) return false;
      if (catChips.length > 0 && !catChips.every((c) => f.accepts.includes(c))) return false;
      return true;
    });
  }, [facilities, search, selectedChips]);
}
