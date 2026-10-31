import React from 'react';
import {
  Droplets,
  Wind,
  Gauge,
  CloudRain,
  Cloud,
  Sun,
  Star,
} from 'lucide-react';
import { Location, WeatherData, TemperatureUnit, WindUnit } from '@/types/weather';
import {
  formatTemp,
  formatWindSpeed,
  getWeatherDescription,
  getWindDirectionLabel,
} from '@/utils/formatters';
import WeatherIcon from './WeatherIcon';
import styles from '@/styles/Dashboard.module.css';

interface CurrentWeatherProps {
  location: Location;
  weather: WeatherData;
  tempUnit: TemperatureUnit;
  windUnit: WindUnit;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function CurrentWeather({
  location,
  weather,
  tempUnit,
  windUnit,
  isFavorite,
  onToggleFavorite,
}: CurrentWeatherProps) {
  const { current, daily } = weather;
  const todayMax = daily.temperature2mMax[0] ?? current.temperature + 3;
  const todayMin = daily.temperature2mMin[0] ?? current.temperature - 3;

  return (
    <div className={styles.card}>
      <div className={styles.currentHeader}>
        <div className={styles.locationInfo}>
          <h2 className={styles.cityName}>
            {location.name}
          </h2>
          <span className={styles.countryName}>
            {location.admin1 ? `${location.admin1}, ` : ''}{location.country} ({location.timezone})
          </span>
          <span className={styles.localTime}>
            Pembaruan terakhir: {new Date(current.time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <button
          className={`${styles.favoriteBtn} ${isFavorite ? styles.isFavorite : ''}`}
          onClick={onToggleFavorite}
          title={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
        >
          <Star size={24} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className={styles.currentMain}>
        <div className={styles.tempDisplay}>
          <span className={styles.tempValue}>
            {formatTemp(current.temperature, tempUnit).replace('°', '')}
          </span>
          <span className={styles.tempUnit}>
            {tempUnit === 'celsius' ? '°C' : '°F'}
          </span>
        </div>

        <div className={styles.conditionBox}>
          <WeatherIcon code={current.weatherCode} size={48} />
          <span className={styles.conditionText}>
            {getWeatherDescription(current.weatherCode)}
          </span>
          <span className={styles.highLow}>
            Tinggi: {formatTemp(todayMax, tempUnit)} | Rendah: {formatTemp(todayMin, tempUnit)}
          </span>
          <span className={styles.feelsLike}>
            Terasa seperti {formatTemp(current.apparentTemperature, tempUnit)}
          </span>
        </div>
      </div>

      <div className={styles.metricsGrid}>
        <div className={styles.metricItem}>
          <span className={styles.metricLabel}>
            <Droplets size={14} /> Kelembapan
          </span>
          <span className={styles.metricValue}>{current.humidity}%</span>
        </div>

        <div className={styles.metricItem}>
          <span className={styles.metricLabel}>
            <Wind size={14} /> Angin
          </span>
          <span className={styles.metricValue}>
            {formatWindSpeed(current.windSpeed, windUnit)} ({getWindDirectionLabel(current.windDirection)})
          </span>
        </div>

        <div className={styles.metricItem}>
          <span className={styles.metricLabel}>
            <Gauge size={14} /> Tekanan Udara
          </span>
          <span className={styles.metricValue}>{Math.round(current.pressure)} hPa</span>
        </div>

        <div className={styles.metricItem}>
          <span className={styles.metricLabel}>
            <CloudRain size={14} /> Curah Hujan
          </span>
          <span className={styles.metricValue}>{current.precipitation} mm</span>
        </div>

        <div className={styles.metricItem}>
          <span className={styles.metricLabel}>
            <Cloud size={14} /> Tutupan Awan
          </span>
          <span className={styles.metricValue}>{current.cloudCover ?? 0}%</span>
        </div>

        <div className={styles.metricItem}>
          <span className={styles.metricLabel}>
            <Sun size={14} /> UV Index (Max)
          </span>
          <span className={styles.metricValue}>
            {daily.uvIndexMax && daily.uvIndexMax[0] !== undefined ? daily.uvIndexMax[0] : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
}
