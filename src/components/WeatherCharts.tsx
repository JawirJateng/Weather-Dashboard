'use client';

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { HourlyForecastData, TemperatureUnit } from '@/types/weather';
import { formatHour, cToF } from '@/utils/formatters';
import { TrendingUp } from 'lucide-react';
import styles from '@/styles/Dashboard.module.css';

interface WeatherChartsProps {
  hourly: HourlyForecastData;
  tempUnit: TemperatureUnit;
}

export default function WeatherCharts({ hourly, tempUnit }: WeatherChartsProps) {
  const currentHourPrefix = new Date().toISOString().slice(0, 13);
  const nowIndex = Math.max(
    0,
    hourly.time.findIndex((t) => t.startsWith(currentHourPrefix))
  );
  const chartData = hourly.time.slice(nowIndex, nowIndex + 24).map((timeStr, idx) => {
    const actualIdx = nowIndex + idx;
    const tempC = hourly.temperature2m[actualIdx];
    const temp = tempUnit === 'fahrenheit' ? cToF(tempC) : tempC;
    return {
      time: formatHour(timeStr),
      temperature: Math.round(temp),
      precipitation: hourly.precipitationProbability[actualIdx],
    };
  });

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>
        <TrendingUp size={18} /> Grafik Tren Suhu & Hujan (24 Jam)
      </h3>

      <div style={{ width: '100%', height: 220, marginTop: 8 }}>
        <ResponsiveContainer>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#526C78" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#526C78" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E3E7E2" />
            <XAxis dataKey="time" stroke="#747C76" fontSize={11} tickLine={false} />
            <YAxis stroke="#747C76" fontSize={11} tickLine={false} unit="°" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E3E7E2',
                borderRadius: '8px',
                fontSize: '0.85rem',
                color: '#202522',
              }}
              formatter={(value: unknown, name: unknown) => [
                name === 'temperature' ? `${value}°${tempUnit === 'fahrenheit' ? 'F' : 'C'}` : `${value}%`,
                name === 'temperature' ? 'Suhu' : 'Peluang Hujan',
              ]}
            />
            <Area
              type="monotone"
              dataKey="temperature"
              stroke="#526C78"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#tempGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
