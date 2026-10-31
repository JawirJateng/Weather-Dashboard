import React from 'react';
import { Location } from '@/types/weather';
import { Star, X } from 'lucide-react';
import styles from '@/styles/Dashboard.module.css';

interface FavoriteCitiesProps {
  favorites: Location[];
  onSelectFavorite: (location: Location) => void;
  onRemoveFavorite: (id: number) => void;
}

export default function FavoriteCities({
  favorites,
  onSelectFavorite,
  onRemoveFavorite,
}: FavoriteCitiesProps) {
  if (favorites.length === 0) return null;

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>
        <Star size={18} /> Kota Tersimpan / Favorit
      </h3>

      <div className={styles.favoritesList}>
        {favorites.map((loc) => (
          <div key={loc.id} className={styles.favoriteChip}>
            <span onClick={() => onSelectFavorite(loc)} style={{ cursor: 'pointer', fontWeight: 500 }}>
              {loc.name}
            </span>
            <button
              className={styles.favoriteChipRemove}
              onClick={(e) => {
                e.stopPropagation();
                onRemoveFavorite(loc.id);
              }}
              title="Hapus dari favorit"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
