import { getData } from "./getData";

const CACHE_KEY = "products_cache";
const CACHE_TIME_MS = 10 * 60 * 1000; // 10 minutos

export async function getCachedData() {
  const cachedString = localStorage.getItem(CACHE_KEY);
  if (cachedString) {
    try {
      const cached = JSON.parse(cachedString);
      const now = Date.now();

      if (now - cached.timestamp < CACHE_TIME_MS) {
        updateCacheInBackground();
        return cached.data;
      }
    } catch (error) {
      console.error("Error parsing cache", error);
    }
  }

  const freshData = await fetchFreshData();
  return freshData;
}

async function fetchFreshData() {
  const data = await getData();
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    timestamp: Date.now(),
    data: data
  }));
  return data;
}

async function updateCacheInBackground() {
  const freshData = await getData();
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    timestamp: Date.now(),
    data: freshData
  }));
  // Aquí puedes añadir una manera de notificar que hay datos nuevos si quieres
}
