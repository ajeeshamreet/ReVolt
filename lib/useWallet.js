import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@revolt_wallet_history';
const listeners = new Set();

function notify(items) {
  listeners.forEach((listener) => listener(items));
}

export function useWallet() {
  const [history, setHistory] = useState([]);

  const load = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setHistory(parsed);
      }
    } catch (err) {
      // Proceed with current state
    }
  }, []);

  useEffect(() => {
    listeners.add(setHistory);
    load();
    return () => {
      listeners.delete(setHistory);
    };
  }, [load]);

  const addDropOff = useCallback(async ({ device, points, facility }) => {
    const deviceName = typeof device === 'object' ? device.name : device;
    const facilityName = typeof facility === 'object' ? facility.name : facility;
    const entry = {
      id: Date.now().toString(),
      device: deviceName,
      points: Number(points) || 0,
      facility: facilityName,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };

    try {
      const current = await AsyncStorage.getItem(STORAGE_KEY);
      const existing = current ? JSON.parse(current) : [];
      const updated = [entry, ...existing];
      setHistory(updated);
      notify(updated);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return entry;
    } catch (err) {
      return null;
    }
  }, []);

  const points = history.reduce((sum, item) => sum + (item.points || 0), 0);

  return { points, history, addDropOff, refresh: load };
}
