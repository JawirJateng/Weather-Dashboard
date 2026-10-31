# 🌤️ Weather Dashboard

Aplikasi web modern, responsif, dan minimalis untuk memantau kondisi cuaca aktual, prakiraan per jam, serta prakiraan 7 hari kedepan berdasarkan lokasi pengguna atau pencarian kota di seluruh dunia.

![Weather Dashboard](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Open-Meteo API](https://img.shields.io/badge/API-Open--Meteo-green?style=for-the-badge)

---

## ✨ Fitur Utama

1. **Cuaca Aktual (Current Weather)**:
   - Menampilkan suhu saat ini, kondisi cuaca, ikon dinamis, suhu *feels-like*, serta suhu tertinggi/terendah hari ini.
   - Ringkasan metrik lengkap: Kelembapan, kecepatan & arah angin, tekanan udara, curah hujan, tutupan awan, dan indeks UV maksimal.
2. **Pencarian Kota Pintar**:
   - Cari kota di seluruh dunia menggunakan Open-Meteo Geocoding API dengan fitur *debounce* yang responsif.
3. **Lokasi Perangkat GPS**:
   - Tombol "Lokasi Saya" untuk mendeteksi koordinat GPS perangkat secara instan menggunakan Browser Geolocation API.
4. **Prakiraan Per Jam & 7 Hari**:
   - Strip gulir horizontal untuk prakiraan cuaca 24 jam kedepan beserta peluang hujan.
   - Tabel/kartu prakiraan 7 hari kedepan lengkap dengan rentang suhu *min/max*.
5. **Grafik Tren Interaktif**:
   - Grafik area interaktif (menggunakan Recharts) untuk memantau tren suhu dan curah hujan selama 24 jam.
6. **Kota Favorit**:
   - Simpan kota-kota favorit Anda ke *localStorage* untuk akses cepat kapan saja.
7. **Kustomisasi Satuan & Tema**:
   - Toggle satuan suhu (°C / °F).
   - Mode Light / Dark dengan penyimpanan preferensi otomatis.

---

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Library UI**: React
- **Bahasa**: TypeScript
- **Styling**: CSS Modules & CSS Variables (Tanpa Tailwind CSS/Bootstrap)
- **Ikon**: Lucide React
- **Grafik**: Recharts
- **Sumber Data Cuaca**: Open-Meteo API (Free & Open-Source Weather API)

---

## 🚀 Cara Menjalankan Project

### 1. Prasyarat
Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) (versi 18+) di komputer Anda.

### 2. Instalasi Dependensi
Clone repository ini dan instal dependensi yang diperlukan:
```bash
git clone https://github.com/JawirJateng/Weather-Dashboard.git
cd Weather-Dashboard
npm install
```

### 3. Menjalankan Server Development
Jalankan perintah berikut untuk memulai server development lokal:
```bash
npm run dev
```
Buka browser Anda dan akses **[http://localhost:3000](http://localhost:3000)**.

### 4. Build untuk Production
Untuk membuat build aplikasi teroptimasi:
```bash
npm run build
npm start
```

---

## 📄 Lisensi
Proyek ini dibuat untuk keperluan pembelajaran dan pengembangan aplikasi web modern. Sumber data cuaca disediakan secara bebas oleh [Open-Meteo](https://open-meteo.com/).
