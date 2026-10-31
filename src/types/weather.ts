export interface Location {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
  humidity: number;
  pressure: number;
  precipitation: number;
  uvIndex?: number;
  cloudCover?: number;
  visibility?: number;
  time: string;
}

export interface HourlyForecastData {
  time: string[];
  temperature2m: number[];
  precipitationProbability: number[];
  weatherCode: number[];
  windSpeed10m: number[];
}

export interface DailyForecastData {
  time: string[];
  weatherCode: number[];
  temperature2mMax: number[];
  temperature2mMin: number[];
  sunrise: string[];
  sunset: string[];
  uvIndexMax?: number[];
}

export interface WeatherData {
  current: CurrentWeather;
  hourly: HourlyForecastData;
  daily: DailyForecastData;
  timezone: string;
  timezoneAbbreviation: string;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type WindUnit = 'kmh' | 'ms' | 'mph';
