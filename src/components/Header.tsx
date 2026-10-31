import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Compass, Sun, Moon } from 'lucide-react';
import { Location, TemperatureUnit } from '@/types/weather';
import { searchLocations } from '@/services/weatherApi';
import styles from '@/styles/Dashboard.module.css';

interface HeaderProps {
  onSelectLocation: (location: Location) => void;
  onUseCurrentLocation: () => void;
  tempUnit: TemperatureUnit;
  onToggleTempUnit: (unit: TemperatureUnit) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function Header({
  onSelectLocation,
  onUseCurrentLocation,
  tempUnit,
  onToggleTempUnit,
  theme,
  onToggleTheme,
}: HeaderProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setIsLoading(true);
        try {
          const results = await searchLocations(query);
          setSuggestions(results);
          setShowDropdown(true);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (loc: Location) => {
    onSelectLocation(loc);
    setQuery('');
    setShowDropdown(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoArea}>
        <div className={styles.logoIconWrapper}>
          <Compass size={24} style={{ color: 'var(--accent)' }} />
        </div>
        <h1 className={styles.logoTitle}>Weather Dashboard</h1>
      </div>

      <div className={styles.searchAndControls}>
        <div className={styles.searchContainer} ref={searchRef}>
          <div className={styles.searchInputWrapper}>
            <Search size={18} style={{ color: 'var(--text-secondary)' }} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Cari kota"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                if (suggestions.length > 0) setShowDropdown(true);
              }}
            />
          </div>

          {showDropdown && (
            <ul className={styles.searchResults}>
              {isLoading && (
                <li className={styles.searchItem} style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                  Mencari lokasi...
                </li>
              )}
              {!isLoading && suggestions.length === 0 && (
                <li className={styles.searchItem} style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                  Lokasi tidak ditemukan
                </li>
              )}
              {!isLoading &&
                suggestions.map((loc) => (
                  <li
                    key={loc.id}
                    className={styles.searchItem}
                    onClick={() => handleSelect(loc)}
                  >
                    <span className={styles.searchItemName}>{loc.name}</span>
                    <span className={styles.searchItemDetails}>
                      {loc.admin1 ? `${loc.admin1}, ` : ''}{loc.country}
                    </span>
                  </li>
                ))}
            </ul>
          )}
        </div>

        <button
          type="button"
          className={styles.btn}
          onClick={onUseCurrentLocation}
          title="Gunakan lokasi perangkat saat ini"
        >
          <MapPin size={16} />
          <span>Lokasi Saya</span>
        </button>

        <div className={styles.controlsGroup}>
          <button
            type="button"
            className={styles.themeToggleBtn}
            onClick={onToggleTheme}
            title={theme === 'light' ? 'Aktifkan Dark Mode' : 'Aktifkan Light Mode'}
          >
            {theme === 'light' ? (
              <>
                <Moon size={16} />
                <span>Dark</span>
              </>
            ) : (
              <>
                <Sun size={16} />
                <span>Light</span>
              </>
            )}
          </button>

          <div className={styles.unitToggle} title="Ubah satuan suhu">
            <button
              type="button"
              className={`${styles.unitBtn} ${tempUnit === 'celsius' ? styles.active : ''}`}
              onClick={() => onToggleTempUnit('celsius')}
            >
              °C
            </button>
            <button
              type="button"
              className={`${styles.unitBtn} ${tempUnit === 'fahrenheit' ? styles.active : ''}`}
              onClick={() => onToggleTempUnit('fahrenheit')}
            >
              °F
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
