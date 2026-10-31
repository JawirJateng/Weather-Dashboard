import { Location, WeatherData } from '@/types/weather';

export async function searchLocations(query: string): Promise<Location[]> {
  if (!query || query.trim().length < 2) return [];

  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      query.trim()
    )}&count=8&language=id&format=json`
  );

  if (!response.ok) {
    throw new Error('Gagal mencari lokasi. Periksa koneksi internet Anda.');
  }

  const data = await response.json();
  if (!data.results) return [];

  return data.results.map((item: Record<string, unknown>) => ({
    id: Number(item.id),
    name: String(item.name || ''),
    country: String(item.country || ''),
    admin1: String(item.admin1 || item.admin2 || ''),
    latitude: Number(item.latitude),
    longitude: Number(item.longitude),
    timezone: String(item.timezone || 'UTC'),
  }));
}

export async function getWeatherData(latitude: number, longitude: number, timezone = 'auto'): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=${encodeURIComponent(
    timezone
  )}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Gagal mengambil data cuaca dari server.');
  }

  const data = await response.json();

  return {
    current: {
      temperature: data.current.temperature_2m,
      apparentTemperature: data.current.apparent_temperature,
      weatherCode: data.current.weather_code,
      windSpeed: data.current.wind_speed_10m,
      windDirection: data.current.wind_direction_10m,
      humidity: data.current.relative_humidity_2m,
      pressure: data.current.pressure_msl || data.current.surface_pressure,
      precipitation: data.current.precipitation,
      cloudCover: data.current.cloud_cover,
      time: data.current.time,
    },
    hourly: {
      time: data.hourly.time,
      temperature2m: data.hourly.temperature_2m,
      precipitationProbability: data.hourly.precipitation_probability,
      weatherCode: data.hourly.weather_code,
      windSpeed10m: data.hourly.wind_speed_10m,
    },
    daily: {
      time: data.daily.time,
      weatherCode: data.daily.weather_code,
      temperature2mMax: data.daily.temperature_2m_max,
      temperature2mMin: data.daily.temperature_2m_min,
      sunrise: data.daily.sunrise,
      sunset: data.daily.sunset,
      uvIndexMax: data.daily.uv_index_max,
    },
    timezone: data.timezone,
    timezoneAbbreviation: data.timezone_abbreviation || '',
  };
}
