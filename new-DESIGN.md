# Emotion Agency — Interfaces People Remember
> **Awwwards-Class Creative Agency & Interactive Web Experience Specification**  
> Extracted, Analyzed, & Verified against live production: [https://emotion-agency.com/](https://emotion-agency.com/)

---

## 1. Executive Summary & Brand Core

- **Brand / Studio**: Emotion Agency — Interfaces People Remember
- **URL**: `https://emotion-agency.com/`
- **Origin**: Kryvyi Rih, Ukraine (Est. 2018)
- **Product Classification**: Award-Winning Digital Creative Agency Portfolio & Immersive Interactive Web Experience *(Catatan koreksi: Bukan "dashboard SaaS web app")*
- **Audience**: High-profile global brands, founders, venture funds, creative directors, and design-forward technology companies.
- **Accolades & Recognition**: 70+ International Awards including:
  - **Awwwards [31]**: Studio of the Year Nominee (2X), Developer of the Year Nominee (1X), Mobile Site of the Year Nominee (3X), Site of the Day (4X), Developer Award (4X), Honorable Mention (14X), Mobile of the Week (3X).
  - **CSS Design Awards [32]**: Designer of the Year Nominee, Site of the Day (9X), Special Kudos (11X), Best UI/UX/Innovation (11X).
  - **Behance [4]**, **Communication Arts [2]**, **Codrops [1]**.

---

## 2. Creative Direction & Aesthetic Foundations

- **Aesthetic Movement**: Avant-garde Editorial Brutalism & Ambient 3D Surrealism.
- **Visual Contrast**: Disposisi kontras ekstrem antara tipografi serif display raksasa (~99px) dengan label teknis monospaced presisi (12px) bergaya instrumen navigasi laboratorium/audio workstation.
- **Atmospheric Experience**: Perpaduan audio ambient lofi, pantulan air WebGL 3D, partikel bercahaya yang berdenyut, dan scrolling tanpa hambatan (*frictionless virtual smooth scroll*).

---

## 3. Typography System

Emotion Agency menggunakan perpaduan harmonis tiga font (The Holy Trinity of Creative Websites):

### A. Font Families & Roles
1. **Primary Editorial Display**: `"Emotion Serif", serif`
   - **Role**: Headlines utama (H1, H2, H3), section titles, dan pernyataan filosofis.
   - **Weights & Styles**: `300` (Light/Book), dengan kata pembuka bertrik italic elegan (*"Where"*, *"Beauty"*, *"We build"*).
   - **Kerning & Leading**: Leading sangat ketat (~0.8x font size) untuk memberikan dampak visual editorial majalah mode/seni kelas atas.
2. **Primary Technical Monospace**: `"IBM Plex Mono", monospace`
   - **Role**: Body copy, UI labels, navigasi, indeks bernomor `(001)` s.d. `(012)`, status audio, dan tags metadata.
   - **Weights**: `500` (Medium).
   - **Text Transform**: Mayoritas `uppercase` dengan letter-spacing proporsional.
3. **Secondary Modern Sans**: `"PP Neue Montreal", sans-serif`
   - **Role**: Teks deskripsi alternatif, paragraf pembacaan panjang, dan sub-teks kontemporer.
   - **Weights**: `500` (Medium).

### B. Typography Scale Tokens
- `font.size.xs`: `10.29px` (Metadata, status indicator, chip label)
- `font.size.sm`: `11.32px` (Secondary tag, timestamp, copyright)
- `font.size.base`: `12.35px` | `line-height`: `14.2px` (UI label, button text, body monospace)
- `font.size.lg`: `14.40px` (Lead paragraph, callout)
- `font.size.xl`: `20.58px` (Sub-heading mobile)
- `font.size.2xl`: `24.69px` | `line-height`: `19.75px` (H4 Section sub-title)
- `font.size.3xl`: `32.92px` | `line-height`: `26.34px` (H3 Major section header)
- `font.size.display`: `98.77px` (~6.17rem) | `line-height`: `79.02px` (~0.8) (H1/H2 Hero editorial headline)

---

## 4. Color System & Theming Tokens

Situs memiliki arsitektur dual-mode (`[data-theme="light"]` default dan `[data-theme="dark"]`) yang dapat diubah secara instan lewat menu Settings.

### A. Light Mode (Default Theme — Ethereal Lavender)
```css
:root, [data-theme="light"] {
  --background: #f5efff;            /* rgb(245, 239, 255) Soft luminous lilac/lavender */
  --foreground: #2a1647;            /* rgb(42, 22, 71) Midnight eggplant violet */
  --foreground-muted: #64698b;      /* rgb(100, 105, 139) Slate purple */
  --primary: #9047ff;               /* rgb(144, 71, 255) Electric violet accent */
  --primary-active: #7114ff;        /* rgb(113, 20, 255) Deep neon violet */
  --card: #ffffff;
  --border: #e2e4f0;                /* rgb(226, 228, 240) Soft lavender gray */
  --muted: #f1f2f9;
  --contrast: #000000;
  --glass: #ffffff;
  --backdrop: rgba(0, 0, 0, 0.8);
  --btn-color: #581c87;
  --btn-stroke: linear-gradient(90deg, #2d257d 0%, #8e2de2 4%, #f5efff 31%, #f5efff 60%, #cbd5e1 85%, #8e2de2 100%);
}
```

### B. Dark Mode (`[data-theme="dark"]` — Obsidian Void)
```css
[data-theme="dark"] {
  --background: #121212;            /* rgb(18, 18, 18) Obsidian black */
  --foreground: #ffffff;            /* rgb(255, 255, 255) Crisp white */
  --foreground-muted: #a3a6c1;      /* rgb(163, 166, 193) Muted ash violet */
  --primary: #9047ff;               /* rgb(144, 71, 255) Electric violet */
  --primary-active: #7114ff;        /* rgb(113, 20, 255) */
  --card: #181818;                  /* rgb(24, 24, 24) Elevated dark card */
  --border: #30343f;                /* rgb(48, 52, 63) */
  --muted: #25282e;
  --contrast: #ffffff;
  --glass: #000000;
  --backdrop: rgba(0, 0, 0, 0.9);
  --btn-color: #e5e5e5;
}
```

### C. Status & Border Tokens
- `status.danger`: `#ff3b30` | Active: `#c91b11`
- `status.success`: `#319f43`
- `radius.sm`: `4px` | `radius.md`: `8px` | `radius.lg`: `12px` | `radius.xl`: `16px` | `radius.full`: `9999px`

---

## 5. Layout & Spacing Grid System

### A. 12-Column Architectural Overlay Grid
- Container class: `.app-grid.container.grid`
- Columns: `grid-template-columns: repeat(12, 1fr)`
- Column Gap: `16.46px` (`space.5`)
- Alignment: Fixed full-height overlay with pointer-events disabled untuk memastikan ritme vertikal dan horizontal yang ketat di seluruh viewport.

### B. Spacing Scale Tokens
- `space.1`: `4.12px`
- `space.2`: `6.17px`
- `space.3`: `8.23px`
- `space.4`: `10.29px`
- `space.5`: `16.46px` (Default column gap & standard padding)
- `space.6`: `17.49px`
- `space.7`: `20.58px`
- `space.8`: `28.81px`

---

## 6. Technical Stack & Motion Architecture

Untuk membangun website di tingkatan Awwwards seperti Emotion Agency, arsitektur teknisnya terbagi dalam layer-layer berikut:

```
┌─────────────────────────────────────────────────────────────┐
│                       UI / DOM LAYER                        │
│   Nuxt 3 / Next.js + Reka UI (Headless Primitives) + HTML5  │
├─────────────────────────────────────────────────────────────┤
│                     INTERACTIVE AUDIO                       │
│    Howler.js (11 Stems) + HTML5 2D Canvas Equalizer         │
├─────────────────────────────────────────────────────────────┤
│                     MOTION & TIMELINE                       │
│      Lenis (Virtual Smooth Scroll) + GSAP 3 (ScrollTrigger) │
├─────────────────────────────────────────────────────────────┤
│                    3D & WEBGL ENVIRONMENT                   │
│   Three.js r185 / WebGL 2.0 (Particles, Terrain, Water)     │
└─────────────────────────────────────────────────────────────┘
```

### A. Core Technologies
1. **Core Framework**: **Nuxt 3** (Vue 3 SSR/SSG ter-deploy di Vercel Edge). *Bisa diimplementasikan dengan Next.js / Astro / React.*
2. **Animation Engine**: **GSAP `v3.14.2`** (Timeline orchestration, matrix transforms, split-text reveal, scrubbed pinned containers).
3. **Smooth Scroll Engine**: **Lenis `v1.3.25`**
   - Viewport dikunci pada `html` & `body` (`overflow: hidden; height: 100vh; position: relative`).
   - Konten ditempatkan pada wrapper fixed `.smooth-scroll.lenis` yang menerima interpolasi wheel dan touch.
   - Dilengkapi custom draggable scrollbar indicator (`.scrollbar` & `.scrollbar__thumb`).
4. **WebGL 3D Engine**: **Three.js `r185`** running on **WebGL 2.0**
   - Fullscreen background canvas (`width: 100vw, height: 100vh`).
   - Surreal purple valley terrain & real-time water wave reflection.
   - Pendaran ribuan partikel 3D membentuk logo Emotion Agency (`ə`) yang responsif terhadap pergerakan kursor mouse.
   - Pengaturan kualitas grafis via Settings: **High** vs **Low (RECOMMENDED)** untuk optimasi framerate 60-120fps.
5. **Interactive Audio System**: **Howler.js** (Web Audio API)
   - Onboarding modal pembuka: *"Enter with audio"* / *"Enter without audio"*.
   - Live canvas visualizer di header (`<canvas class="sound-viz__canvas">`).
   - 11 Audio tracks:
     - Background ambient: `/audio/background/webm/main.webm` (vol 0.8)
     - Lofi ambient loop: `/audio/background/webm/lofi_loop.webm` (vol 0.2)
     - Projects ambient: `/audio/background/webm/projects.webm` (vol 0.2)
     - Micro-SFX: `transition.webm`, `boom.webm`, `typing.webm`, `dial.webm`, `knob_tick.webm`, `click.webm`, `success.webm`, `error.webm`.
6. **Headless UI Primitives**: **Reka UI** (Radix Vue) untuk dropdown menu settings, switches, dan dialogs yang accessible (WCAG 2.2 AA).
7. **Dynamic Canvas Micro-Gradients**:
   - Setiap tombol interaktif memiliki elemen `<canvas class="button__gradient">` dan `<canvas class="ai-btn__gradient">` yang menggambar animasi gradasi berpendar dinamis saat hover/active.

---

## 7. Section-by-Section Structural Breakdown

### 1. Preloader & Audio Gate
- Layar pembuka berlatar gelap/lilac dengan logo animasi dan statement: *"AWARD-WINNING WEBSITES AND DIGITAL PRODUCTS FOR THE BRANDS OF TOMORROW"*.
- Progress bar dengan persentase real-time (`loader__percent`).
- Dua CTA interaktif penentu preferensi audio: `[ Enter with audio ]` dan `[ Enter without audio ]`.

### 2. Global Header & Persistent HUD
- **Brand Mark**: `əmoti9n` SVG monogram di kiri.
- **Center Navigation**: `ABOUT`, `WORK`, `CONTACT`.
- **Right Utilities**:
  - `[⚙ SETTINGS]`: Membuka menu Reka UI dengan toggle **Sound**, toggle **Dark mode**, dan switcher **Quality (High/Low)**.
  - **Live Sound Visualizer**: Canvas visualizer audio bar mini + tombol mute instan.
  - **CTA Button**: Pill `Let's talk ↳` berhias border gradasi animasi (`--btn-stroke`) dan glow canvas.

### 3. 5-Stage Pinned Storytelling Hero (`.hero-storytelling`)
- Memiliki virtual scroll height sebesar `15,168px` (~20x tinggi viewport).
- Viewport tetap ter-pin sementara Lenis & GSAP melakukan cross-fading transisi antar-5 layar cerita:
  - **Stage 1 (Opening)**: H1 *"Where AMBITIOUS IDEAS BECOME INTERFACES PEOPLE REMEMBER"*.
  - **Stage 2 (Approach)**: H2 *"We build more than websites and products"* — *"WE CREATE DIGITAL EXPERIENCES WHERE TECHNOLOGY AND CREATIVITY SPEAK THE SAME LANGUAGE"*.
  - **Stage 3 (Vibes)**: H2 *"Technology as emotion"* — *"WE TURN CODE INTO FEELING, MOTION INTO MEANING, AND INTERACTION INTO MEMORY"*.
  - **Stage 4 (Design)**: H2 *"Beauty with a reason"* — *"EVERY PIXEL HAS A REASON. WE DESIGN TO SOLVE REAL PROBLEMS AND CREATE VALUE"*.
  - **Stage 5 (Our People)**: H2 *"We build with people who care how things feel"* — *"OUR BEST WORK ALWAYS COMES BACK TO ONE THING"*.

### 4. Capabilities & Services Manifest (`.what-we-do`)
- Manifesto: *"We design and engineer digital products for ambitious teams — from launch sites to full-scale SaaS platforms"*.
- 12 Layanan dengan badge monospaced `(001)` s.d. `(012)`:
  - `(001)` Marketing Websites, `(002)` Landing Pages & Launches, `(003)` Brand Identity Systems, `(004)` Product UX & Design, `(005)` Web Applications, `(006)` Mobile Applications, `(007)` E-commerce Platforms, `(008)` SaaS Dashboards, `(009)` Custom Motion & Animation, `(010)` 3D & Interactive Experiences, `(011)` Design Systems, `(012)` AI-Driven Interfaces.

### 5. Selected Works Portfolio (`.h-projects`)
- Header: *"Some of our projects — A selection of projects where design, technology, and strategy come together"*.
- Interactive project showcase cards dengan WebP image preview, emotional labels, dan tags teknologi:
  - E Promo (Confidence / Next.js / GSAP)
  - Flashform (3D Interactive / WebGL / Three.js)
  - Sofia Shcherbak (Design Portfolio / Nuxt / GSAP)
  - Relive by Coco (E-commerce / Shopify / WebGL)
  - Kairos Fund, AI Tools, Gamemarket, Leonid Kostetskyi (OGL / WebGL).

### 6. Awards & Social Proof (`.awards`)
- **Total Accolades**: 70 Penghargaan internasional terverifikasi.
- Grid berindeks monospace: `[31] Awwwards`, `[32] CSS Design Awards`, `[04] Behance`, `[02] Communication Arts`, `[01] Codrops`.

### 7. Footer & Continuous Page Reveal (`.next-reveal` & `.footer`)
- Headline: *"Let's build something meaningful"*.
- CTA: *"Start project"* & Quick copy email button `hello@emotion-agency.com` dengan live toast status.
- Social links: `[01] Awwwards`, `[02] Twitter / X`, `[03] Instagram`, `[04] Linkedin`, `[05] Behance`.
- **Infinite Scroll Transition**: Mekanisme overscroll `KEEP SCROLLING (JUST CONTINUE TO REVEAL) [ NEXT PAGE ] About` yang melakukan transisi halaman mulus tanpa hard reload.

### 8. Floating Persistent Widgets
- **AI Assistant**: Orb mengambang di pojok kanan bawah dengan gradien iridescent 3D (`ai-btn`) yang membuka chat drawer interaktif.
- **Custom Scrollbar**: Indikator vertikal minimalis di sisi kanan (`.scrollbar`) dengan tracking translasi real-time.

---

## 8. Quality, Performance & Accessibility Standards (WCAG 2.2 AA)

1. **Accessibility (a11y)**:
   - Penggunaan komponen headless Reka UI menjamin navigasi keyboard penuh (`Tab`, `Escape`, `Enter`, `ArrowKeys`).
   - Indikator fokus `:focus-visible` wajib kontras dan terlihat jelas.
   - Elemen interaktif audio wajib memiliki opsi Mute dan tombol bypass langsung.
   - Screen reader announcements menggunakan `aria-live="polite"` untuk toast dan status copy email.
2. **Performance (60-120 FPS Target)**:
   - Optimasi GPU: Penggunaan `transform: matrix(...)` dan `opacity` untuk animasi GSAP guna menghindari layout thrashing/reflow.
   - WebGL Render Loop: `requestAnimationFrame` dengan throttling saat tab tidak aktif (`document.hidden`).
   - Graphic Quality Tiering: Opsi resolusi render (High / Low) menyesuaikan `devicePixelRatio` (1.0 vs 2.0).
3. **Motion Sensitivity (`prefers-reduced-motion`)**:
   - Menghormati pengaturan aksesibilitas sistem pengguna dengan mematikan smooth scroll inertia dan WebGL particle velocity jika requested.
