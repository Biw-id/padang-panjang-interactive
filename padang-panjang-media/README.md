# 🏛️ Website Padang Panjang — Data & Media Package

Paket aset lengkap, data konten terstruktur, dan panduan desain untuk pembuatan website modern **Kota Padang Panjang, Sumatera Barat**.

Repository ini telah dioptimasi secara komprehensif sehingga dapat langsung diintegrasikan ke dalam framework web modern (seperti **Next.js 15, Astro 4, Vite + React, atau Tailwind CSS**) pada sesi pengerjaan berikutnya.

---

## 📂 Struktur Direktori Proyek

```
d:/Abiyyu/padang-panjang-media/
├── data/
│   ├── site_content.json             # Dataset lengkap konten website (Props, Stats, Sections)
│   └── site_content.ts               # Typed TypeScript module (export const siteContent)
├── docs/
│   └── KOTA_PADANG_PANJANG_INFO.md   # Ensiklopedia & riset lengkap narasi sejarah kota (12.8 KB)
├── media_webp/                       # ⭐ ASET WEB RESMI (Terkompresi WebP Lanczos, Total 7.8 MB)
│   ├── 01_hero_landscape/           # Banner lanskap (2560px), panorama Marapi-Singgalang, gerbang kota
│   ├── 02_landmarks_arsitektur/     # PDIKM Rumah Gadang, Museum Bustanil, Islamic Center, Masjid Asasi 1702
│   ├── 03_sejarah_heritage/         # Foto vintage Tropenmuseum, rute kereta api Sawahlunto, stasiun klasik
│   ├── 04_wisata_alam/              # Air Terjun Lembah Anai, Lubuk Mata Kucing, wahana Mifan
│   ├── 05_budaya_seni/              # Silek Lanyah lumpur Kubu Gadang, Randai, Pacu Kuda Bancah Laweh
│   ├── 06_kuliner_khas/             # Sate Padang Mak Syukur, peternakan sapi perah, dadiah, teh talua
│   ├── 07_pendidikan_tokoh/         # ISI Padang Panjang, Diniyyah Puteri, Rahmah El Yunusiyyah, Buya Hamka
│   └── 08_branding_identitas/       # Lambang kota (PNG transparan), peta lokasi (SVG), tekstur ukiran kayu
├── media/                            # 🗄️ ASET MASTER ASLI (Full Resolution Archive, Total 101 MB)
├── media_catalog.md                 # Katalog deskripsi tiap gambar & rekomendasi penempatan UI
├── media_metadata_optimized.json    # Metadata dimensi, rasio aspek, & penghematan bandwidth WebP
└── README.md                        # Panduan developer sesi baru ini
```

---

## 🚀 Panduan Memulai di Sesi Baru (Quickstart for New Session)

Jika Anda membuka sesi baru untuk mulai memprogram website, berikan instruksi singkat kepada AI:
> *"Tolong buatkan website interaktif untuk Kota Padang Panjang menggunakan aset dan data yang sudah disiapkan di folder `d:\Abiyyu\padang-panjang-media\`."*

### 1. Cara Menggunakan Data Konten
Data sudah dikemas dalam format TypeScript dan JSON:
```typescript
// Di dalam project Next.js / Astro / React:
import { siteContent } from "../padang-panjang-media/data/site_content";

export default function HomePage() {
  const { hero, quickStats, destinations, gastronomy, cultureAndTradition } = siteContent;
  // Langsung render ke komponen UI!
}
```

### 2. Menggunakan Aset Gambar Berkecepatan Tinggi
* Gunakan folder **`media_webp/`** untuk semua kebutuhan tampilan web.
* Ukuran file telah dikompresi sebesar **92.2%** (dari 101 MB menjadi hanya 7.8 MB) tanpa mengorbankan ketajaman tampilan pada layar Retina/4K.
* Format gambar `.webp` didukung oleh seluruh browser modern (Chrome, Safari, Firefox, Edge, iOS, Android).

---

## 🎨 Rekomendasi Palet Warna & Desain UI (Minang Modern Aesthetic)

Untuk memberikan nuansa otentik Minangkabau yang berpadu dengan modernitas:

| Warna | Hex | Peran dalam UI |
|:---|:---|:---|
| **Marawa Hitam (Itam)** | `#121316` | Background dark mode, header teks utama, simbol keteguhan adat |
| **Marawa Merah (Sirah)** | `#B91C1C` / `#DC2626` | Aksen tombol CTA, badge sorotan, simbol keberanian |
| **Marawa Kuning Emas** | `#D97706` / `#F59E0B` | Highlight kubah Islamic Center, ornamen ukiran gonjong |
| **Sejuk Pegunungan (Emerald)** | `#065F46` / `#059669` | Nuansa keasrian lembah, wisata alam, dan keteduhan kota sejuk |
| **Kabut Singgalang (Slate Mist)**| `#F8FAFC` / `#E2E8F0` | Background light mode, kartu konten yang bersih |

---

## 💡 Arsitektur Komponen yang Disarankan

1. **`Navbar`**: Menampilkan lambang kota, navigasi pintas, dan *toggle* dark/light mode.
2. **`HeroSection`**: Background scrollytelling `hero_pdikm_lanskap_hutan.webp` berpadu headline megah, cuaca real-time / stat baris suhu (17°–26°C, 650–850 mdpl).
3. **`StatsOverview`**: Kartu statistik interaktif ketinggian, elevasi, julukan *"Serambi Mekkah"* & *"Kota Hujan"*.
4. **`DestinationsGrid`**: Filter tabs (Alam, Religi, Cagar Budaya, Wahana) dengan modal lightbox detail.
5. **`HeritageTimeline`**: Rute sejarah kereta api gigi peninggalan Hindia Belanda & lokomotif Mak Itam.
6. **`CultureShowcase`**: Kartu aksi dinamis atraksi Silek Lanyah Kubu Gadang & tari piring ISI.
7. **`CulinaryCarousel`**: Sorotan Sate Padang Mak Syukur, ampiang dadiah, susu murni, dan teh talua.
8. **`IntellectualsHall`**: Biografi Rahmah El Yunusiyyah (pahlawan nasional & pendiri Diniyyah Puteri) dan Buya Hamka.
9. **`Footer`**: Peta lokasi SVG interaktif, kontak pemkot, dan hak cipta.
