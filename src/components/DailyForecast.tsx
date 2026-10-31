import React from 'react';
import { DailyForecastData, TemperatureUnit } from '@/types/weather';
import { formatDate, formatTemp, getWeatherDescription } from '@/utils/formatters';
import WeatherIcon from './WeatherIcon';
import { Calendar } from 'lucide-react';
import styles from '@/styles/Dashboard.module.css';

interface DailyForecastProps {
  daily: DailyForecastData;
  tempUnit: TemperatureUnit;
}

export default function DailyForecast({ daily, tempUnit }: DailyForecastProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>
        <Calendar size={18} /> Prakiraan 7 Hari Kedepan
      </h3>

      <div className={styles.dailyList}>
        {daily.time.slice(0, 7).map((dateStr, idx) => {
          const code = daily.weatherCode[idx];
          const maxTemp = daily.temperature2mMax[idx];
          const minTemp = daily.temperature2mMin[idx];
          const isToday = idx === 0;

          return (
            <div key={dateStr} className={styles.dailyRow}>
              <span className={styles.dailyDay}>
                {isToday ? 'Hari Ini' : formatDate(dateStr)}
              </span>

              <div className={styles.dailyIcon}>
                <WeatherIcon code={code} size={22} />
                <span>{getWeatherDescription(code)}</span>
              </div>

              <div className={styles.dailyTemps}>
                <span className={styles.dailyMin}>{formatTemp(minTemp, tempUnit)}</span>
                <span style={{ color: 'var(--border-color)' }}>/</span>
                <span className={styles.dailyMax}>{formatTemp(maxTemp, tempUnit)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
