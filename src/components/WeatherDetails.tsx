import React from 'react';
import { DailyForecastData } from '@/types/weather';
import { Sunrise, Sunset, SunMedium } from 'lucide-react';
import { getUvIndexDescription } from '@/utils/formatters';
import styles from '@/styles/Dashboard.module.css';

interface WeatherDetailsProps {
  daily: DailyForecastData;
}

export default function WeatherDetails({ daily }: WeatherDetailsProps) {
  const sunriseStr = daily.sunrise[0] ? new Date(daily.sunrise[0]).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : 'N/A';
  const sunsetStr = daily.sunset[0] ? new Date(daily.sunset[0]).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : 'N/A';
  const maxUv = daily.uvIndexMax && daily.uvIndexMax[0] !== undefined ? daily.uvIndexMax[0] : 0;
  const uvInfo = getUvIndexDescription(maxUv);

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>
        <SunMedium size={18} /> Matahari & Sinar UV
      </h3>

      <div className={styles.metricsGrid}>
        <div className={styles.metricItem}>
          <span className={styles.metricLabel}>
            <Sunrise size={14} style={{ color: '#D97706' }} /> Matahari Terbit
          </span>
          <span className={styles.metricValue}>{sunriseStr}</span>
        </div>

        <div className={styles.metricItem}>
          <span className={styles.metricLabel}>
            <Sunset size={14} style={{ color: '#D97706' }} /> Matahari Terbenam
          </span>
          <span className={styles.metricValue}>{sunsetStr}</span>
        </div>

        <div className={styles.metricItem}>
          <span className={styles.metricLabel}>
            <SunMedium size={14} style={{ color: '#D97706' }} /> Indeks UV (Max)
          </span>
          <span className={styles.metricValue}>
            {maxUv} ({uvInfo.label})
          </span>
        </div>
      </div>
    </div>
  );
}
