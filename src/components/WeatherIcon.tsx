import React from 'react';
import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudLightning,
  CloudSnow,
  CloudFog,
  Droplets,
} from 'lucide-react';

interface WeatherIconProps {
  code: number;
  size?: number;
  className?: string;
}

export default function WeatherIcon({ code, size = 24, className = '' }: WeatherIconProps) {
  // WMO Weather interpretation codes
  if (code === 0) {
    return <Sun size={size} className={className} style={{ color: '#D97706' }} />;
  }
  if (code === 1 || code === 2) {
    return <CloudSun size={size} className={className} style={{ color: '#526C78' }} />;
  }
  if (code === 3) {
    return <Cloud size={size} className={className} style={{ color: '#747C76' }} />;
  }
  if (code === 45 || code === 48) {
    return <CloudFog size={size} className={className} style={{ color: '#747C76' }} />;
  }
  if (code >= 51 && code <= 57) {
    return <Droplets size={size} className={className} style={{ color: '#3B82F6' }} />;
  }
  if (code >= 61 && code <= 67) {
    return <CloudRain size={size} className={className} style={{ color: '#2563EB' }} />;
  }
  if (code >= 71 && code <= 77) {
    return <CloudSnow size={size} className={className} style={{ color: '#93C5FD' }} />;
  }
  if (code >= 80 && code <= 82) {
    return <CloudRain size={size} className={className} style={{ color: '#1D4ED8' }} />;
  }
  if (code >= 85 && code <= 86) {
    return <CloudSnow size={size} className={className} style={{ color: '#60A5FA' }} />;
  }
  if (code >= 95) {
    return <CloudLightning size={size} className={className} style={{ color: '#B85D58' }} />;
  }

  return <Cloud size={size} className={className} style={{ color: '#747C76' }} />;
}
