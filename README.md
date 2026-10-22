# Padang Panjang Interactive Web

Website interaktif profil Kota Padang Panjang, Sumatera Barat. Menyajikan narasi sejarah, data geografis, destinasi wisata, kebudayaan Minangkabau, dan warisan kuliner legendaris dengan pendekatan visual 3D berbasis web.

Repository: [https://github.com/Biw-id/padang-panjang-interactive](https://github.com/Biw-id/padang-panjang-interactive)

---

## Fitur Utama

- **3D Balok Storytelling (Hero Section)**
  - Objek 3D balok dengan sudut membulat (*chamfered bevel*), menampilkan foto lanskap kota di sisi depan.
  - Merespons pergerakan kursor secara halus (*smooth parallax tilt* tanpa drag).
  - Perpindahan antar-kisah menggunakan transisi snap threshold (balok berputar 360° dan berganti foto secara mulus).
  - Tata letak responsif: bergantian Kanan ◄──► Kiri di layar desktop, serta Teks di Atas & Objek di Bawah (Center) pada perangkat mobile.

- **Background WebGL Procedural**
  - Simulasi punggung pegunungan Singgalang & Tandikat berpadu dengan partikel kabut sejuk khas Padang Panjang (17°C).
  - Efek transparansi *glassmorphism* di semua section sehingga latar belakang 3D tetap terlihat saat halaman di-scroll.

- **3D Rel Gerigi Kolonial 1887**
  - Model 3D roda gigi rel kereta api Lembah Anai yang berputar dinamis seiring scroll halaman.

- **Eksplorasi Konten Terstruktur**
  - Parameter geospasial & data iklim kota.
  - Galeri destinasi unggulan & landmark bersejarah (PDIKM, Mifan, Air Terjun Lembah Anai, Masjid Asasi Sigando).
  - Dokumentasi seni & tradisi (Silek Lanyah, Randai, Tari Piring).
  - Khazanah kuliner (Sate Mak Syukur, Teh Talua, Dadiah, Susu Sapi Murni).
  - Jejak tokoh & pendidikan Islam (Buya Hamka, Rahmah El Yunusiyyah, Diniyyah Puteri, Sumatera Thawalib).

- **Audio Ambien Tradisional**
  - Instrumen Saluang Minang dengan visualizer frekuensi audio pada Header HUD.

- **Navigasi & Kontrol Pengguna**
  - Tombol melayang *Back to Top* di pojok kanan bawah.
  - Reset scroll otomatis ke posisi paling atas saat halaman dimuat ulang (*reload*).
  - Smooth scrolling menggunakan Lenis.

---

## Tech Stack

- **Framework**: React 18, TypeScript, Vite
- **3D Graphics**: Three.js
- **Animasi & Scroll**: GSAP (ScrollTrigger), Lenis
- **Styling**: Tailwind CSS
- **Audio**: Web Audio API, Howler.js
- **Icons**: Lucide React

---

## Struktur Folder

```
padang-panjang-interactive/
├── public/
│   ├── audio/              # Aset instrumen musik tradisional
│   └── media_webp/         # Aset visual foto & identitas teroptimasi WebP
├── src/
│   ├── components/
│   │   ├── audio/          # Modal onboarding audio & visualizer
│   │   ├── canvas/         # Kanvas 3D Three.js (StoryCube3D, RackRailwayGear3D, MountainMistScene)
│   │   ├── hud/            # Header HUD, custom scrollbar, settings drawer
│   │   ├── sections/       # Section halaman (Hero, Stats, Heritage, Destinasi, Budaya, Kuliner, Tokoh)
│   │   └── ui/             # Komponen UI (BackToTopButton, dll)
│   ├── data/               # Konten teks & kurasi media (site_content.ts)
│   ├── hooks/              # Custom hooks (useLenis, useAudioEngine, useTheme)
│   ├── styles/             # Global CSS & Tailwind layer
│   ├── App.tsx             # Root page layout
│   └── main.tsx            # Entry point
├── package.json
└── vite.config.ts
```

---

## Menjalankan Proyek Secara Lokal

### Prasyarat
- Node.js versi 18 atau lebih baru
- npm / pnpm / yarn

### Instalasi & Menjalankan

1. **Clone repository**:
   ```bash
   git clone https://github.com/Biw-id/padang-panjang-interactive.git
   cd padang-panjang-interactive
   ```

2. **Install dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan development server**:
   ```bash
   npm run dev
   ```
   Buka `http://localhost:5173` pada browser.

4. **Build untuk produksi**:
   ```bash
   npm run build
   ```

5. **Preview hasil build**:
   ```bash
   npm run preview
   ```

---

## Lisensi

Proyek ini dibuat untuk dokumentasi interaktif dan eksplorasi profil visual Kota Padang Panjang.
