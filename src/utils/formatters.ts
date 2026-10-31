export function getWeatherDescription(code: number): string {
  switch (code) {
    case 0:
      return 'Cerah';
    case 1:
    case 2:
      return 'Cerah Berawan';
    case 3:
      return 'Berawan';
    case 45:
    case 48:
      return 'Kabut';
    case 51:
    case 53:
    case 55:
      return 'Gerimis';
    case 56:
    case 57:
      return 'Gerimis Beku';
    case 61:
      return 'Hujan Ringan';
    case 63:
      return 'Hujan Sedang';
    case 65:
      return 'Hujan Lebat';
    case 66:
    case 67:
      return 'Hujan Es/Beku';
    case 71:
    case 73:
    case 75:
      return 'Salju';
    case 77:
      return 'Butiran Salju';
    case 80:
    case 81:
    case 82:
      return 'Hujan Lokal';
    case 85:
    case 86:
      return 'Badai Salju';
    case 95:
    case 96:
    case 99:
      return 'Badai Petir';
    default:
      return 'Berawan';
  }
}

export function cToF(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

export function fToC(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9;
}

export function formatTemp(celsius: number, unit: 'celsius' | 'fahrenheit'): string {
  const temp = unit === 'fahrenheit' ? cToF(celsius) : celsius;
  return `${Math.round(temp)}°`;
}

export function formatWindSpeed(kmh: number, unit: 'kmh' | 'ms' | 'mph'): string {
  let val = kmh;
  let label = 'km/j';
  if (unit === 'ms') {
    val = kmh / 3.6;
    label = 'm/s';
  } else if (unit === 'mph') {
    val = kmh / 1.60934;
    label = 'mph';
  }
  return `${Math.round(val)} ${label}`;
}

export function getWindDirectionLabel(degrees: number): string {
  const directions = ['Utara', 'Timur Laut', 'Timur', 'Tenggara', 'Selatan', 'Barat Daya', 'Barat', 'Barat Laut'];
  const index = Math.round((degrees % 360) / 45);
  return directions[index % 8];
}

export function getUvIndexDescription(uv: number): { label: string; level: 'low' | 'moderate' | 'high' | 'very-high' | 'extreme' } {
  if (uv <= 2) return { label: 'Rendah', level: 'low' };
  if (uv <= 5) return { label: 'Sedang', level: 'moderate' };
  if (uv <= 7) return { label: 'Tinggi', level: 'high' };
  if (uv <= 10) return { label: 'Sangat Tinggi', level: 'very-high' };
  return { label: 'Ekstrem', level: 'extreme' };
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  }).format(date);
}

export function formatHour(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date).replace('.', ':');
}
