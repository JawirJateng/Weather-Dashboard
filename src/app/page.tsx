'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Location, WeatherData, TemperatureUnit, WindUnit } from '@/types/weather';
import { getWeatherData } from '@/services/weatherApi';
import Header from '@/components/Header';
import CurrentWeather from '@/components/CurrentWeather';
import HourlyForecast from '@/components/HourlyForecast';
import DailyForecast from '@/components/DailyForecast';
import WeatherCharts from '@/components/WeatherCharts';
import WeatherDetails from '@/components/WeatherDetails';
import FavoriteCities from '@/components/FavoriteCities';
import styles from '@/styles/Dashboard.module.css';

const DEFAULT_LOCATION: Location = {
  id: 1642911,
  name: 'Jakarta',
  country: 'Indonesia',
  admin1: 'Jakarta',
  latitude: -6.2146,
  longitude: 106.8451,
  timezone: 'Asia/Jakarta',
};

export default function Home() {
  const [location, setLocation] = useState<Location>(DEFAULT_LOCATION);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [tempUnit, setTempUnit] = useState<TemperatureUnit>('celsius');
  const [windUnit] = useState<WindUnit>('kmh');
  
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    try {
      const savedTheme = localStorage.getItem('weather_theme');
      if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    } catch (err) {
      console.error(err);
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('weather_theme', theme);
      } catch (err) {
        console.error(err);
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const [favorites, setFavorites] = useState<Location[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('weather_favorites');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.error('Failed to load favorites', err);
    }
    return [];
  });

  const saveFavorites = (newFavs: Location[]) => {
    setFavorites(newFavs);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('weather_favorites', JSON.stringify(newFavs));
      } catch (err) {
        console.error('Failed to save favorites', err);
      }
    }
  };

  const isFavorite = favorites.some((f) => f.id === location.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      saveFavorites(favorites.filter((f) => f.id !== location.id));
    } else {
      saveFavorites([...favorites, location]);
    }
  };

  const fetchWeather = useCallback(async (loc: Location) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getWeatherData(loc.latitude, loc.longitude, loc.timezone);
      setWeather(data);
      setLocation(loc);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat data cuaca.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchWeather(location);
  }, [fetchWeather, location]);

  const handleSelectLocation = (loc: Location) => {
    fetchWeather(loc);
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation tidak didukung oleh browser Anda.');
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const currentLoc: Location = {
          id: Math.floor(Date.now() / 1000),
          name: 'Lokasi Anda',
          country: '',
          admin1: 'Koordinat GPS',
          latitude,
          longitude,
          timezone: 'auto',
        };
        await fetchWeather(currentLoc);
      },
      () => {
        setIsLoading(false);
        setError('Gagal mendapatkan lokasi perangkat. Pastikan izin lokasi diaktifkan.');
      },
      { timeout: 10000 }
    );
  };

  return (
    <div className={styles.container}>
      <Header
        onSelectLocation={handleSelectLocation}
        onUseCurrentLocation={handleUseCurrentLocation}
        tempUnit={tempUnit}
        onToggleTempUnit={setTempUnit}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {isLoading && (
        <div className={styles.loadingBox}>
          <div className={styles.spinner} />
          <p>Memuat data cuaca untuk {location.name}...</p>
        </div>
      )}

      {error && !isLoading && (
        <div className={styles.errorBox}>
          <p style={{ color: 'var(--danger)', fontWeight: 600 }}>{error}</p>
          <button type="button" className={styles.btn} onClick={() => fetchWeather(location)}>
            Coba Lagi
          </button>
        </div>
      )}

      {!isLoading && !error && weather && (
        <div className={styles.mainLayout}>
          <div className={styles.columnLeft}>
            <CurrentWeather
              location={location}
              weather={weather}
              tempUnit={tempUnit}
              windUnit={windUnit}
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
            />
            <HourlyForecast hourly={weather.hourly} tempUnit={tempUnit} />
            <WeatherCharts hourly={weather.hourly} tempUnit={tempUnit} />
          </div>

          <div className={styles.columnRight}>
            <DailyForecast daily={weather.daily} tempUnit={tempUnit} />
            <WeatherDetails daily={weather.daily} />
            <FavoriteCities
              favorites={favorites}
              onSelectFavorite={handleSelectLocation}
              onRemoveFavorite={(id) => saveFavorites(favorites.filter((f) => f.id !== id))}
            />
          </div>
        </div>
      )}

      <footer className={styles.footer}>
        <p>
          Weather Dashboard &copy; 2026 &bull; Data cuaca bersumber dari{' '}
          <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">
            Open-Meteo API
          </a>
        </p>
      </footer>
    </div>
  );
}
