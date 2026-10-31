import React from 'react';
import { HourlyForecastData, TemperatureUnit } from '@/types/weather';
import { formatHour, formatTemp } from '@/utils/formatters';
import WeatherIcon from './WeatherIcon';
import { Droplets, Clock } from 'lucide-react';
import styles from '@/styles/Dashboard.module.css';

interface HourlyForecastProps {
  hourly: HourlyForecastData;
  tempUnit: TemperatureUnit;
}

export default function HourlyForecast({ hourly, tempUnit }: HourlyForecastProps) {
  const currentHourPrefix = new Date().toISOString().slice(0, 13);
  const nowIndex = Math.max(
    0,
    hourly.time.findIndex((t) => t.startsWith(currentHourPrefix))
  );
  const next24Hours = hourly.time.slice(nowIndex, nowIndex + 24);

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>
        <Clock size={18} /> Prakiraan Per Jam (24 Jam Kedepan)
      </h3>

      <div className={styles.hourlyScroll}>
        {next24Hours.map((timeStr, idx) => {
          const actualIdx = nowIndex + idx;
          const temp = hourly.temperature2m[actualIdx];
          const code = hourly.weatherCode[actualIdx];
          const precipProb = hourly.precipitationProbability[actualIdx];

          return (
            <div key={timeStr} className={styles.hourlyCard}>
              <span className={styles.hourlyTime}>
                {idx === 0 ? 'Sekarang' : formatHour(timeStr)}
              </span>
              <WeatherIcon code={code} size={28} />
              <span className={styles.hourlyTemp}>{formatTemp(temp, tempUnit)}</span>
              {precipProb > 0 ? (
                <span className={styles.hourlyPrecip} title={`Peluang hujan ${precipProb}%`}>
                  <Droplets size={12} /> {precipProb}%
                </span>
              ) : (
                <span className={styles.hourlyPrecip} style={{ opacity: 0.4 }}>
                  0%
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
