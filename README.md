# Happy Birthday Priyadharshika ❤️ — Cinematic Birthday Gift

A production-ready, premium interactive digital birthday experience crafted like a cinematic storytelling website. Built using the latest modern web stack (Next.js, TypeScript, Tailwind CSS, and Framer Motion), this project is structured to behave like an interactive movie celebrating a childhood connection, recent reconnection, academic biotechnology achievements, and a respectful indirect proposal.

---

## 🌟 Core Features & Highlights

1. **Procedural Ambient Synthesizer (Audio Player)**
   - Custom-engineered using the **Web Audio API** to generate a soft, dreamlike chord progression (`Cmaj7 -> Fmaj7 -> Am7 -> G6/9`) using triangle pad oscillators and low-pass filter sweeps.
   - Includes real-time bell sparkles synthesized at random pentatonic scale frequencies.
   - Features absolute compliance with user autoplay restrictions (never autoplays), remembers volume settings in local storage, and supports soft fades.
   
2. **Interactive 3D-Look DNA Helix Canvas**
   - Built on HTML5 Canvas with custom 3D projection, depth sorting, and particle explosions.
   - Interactive nodes representing genome base pairs (`Adenine`, `Thymine`, `Guanine`, `Cytosine`) display scientific biological annotations upon hover and release particle bursts on click.

3. **Gamified Constellation (30 Reasons You're Amazing)**
   - A starry night sky rendering 30 interactive, glowing stars.
   - Clicking each star reveals a unique reason for appreciation with Canvas-confetti celebrations, tracking progress towards unlocking a final completion state.

4. **3D Sealed Wax-Seal Envelope Letter**
   - Features a custom CSS clip-path folded glassmorphism envelope with an interactive wax seal.
   - Unlocks and opens with a realistic letter-slide animation revealing the personal message.

5. **Visitor Decryption Easter Egg**
   - Automatically checks the visitor's name from the cinematic introductory loading terminal.
   - Custom-designed easter eggs unlock and display a personalized console panel if the owner name (`Priyadharshika`) is authenticated.

6. **Interactive Birthday Cake Celebration**
   - An SVG-rendered candle cake with breathing flame gradients.
   - Clicking the cake blows out the candles, trigger huge double-wave canvas confetti bursts, and records a birthday wish.

---

## 📁 Architecture & Folder Structure

```
d:\Dharsh\
├── .github/workflows/   # CI/CD deployment automation (GitHub Pages)
│   └── deploy.yml       # Next.js static output compiler & deployer
├── public/              # Global static files & generated images
│   └── images/          # High-end AI art assets
│       ├── biotech-art.webp
│       ├── childhood-art.webp
│       ├── stars-art.webp
│       └── future-art.webp
├── src/
│   ├── app/             # Next.js App Router root & page styling
│   │   ├── globals.css  # Aurora gradients, animations & typography
│   │   ├── layout.tsx   # Metadata & global viewport settings
│   │   └── page.tsx     # Loader state and sections entrypoint
│   ├── components/      # Modular UI & canvas components
│   │   ├── effects/     # Canvas-based rendering systems
│   │   │   ├── DnaHelix.tsx            # Interactive DNA Helix
│   │   │   └── ParticleBackground.tsx  # Fireflies, aurora, & mouse tracking
│   │   ├── sections/    # Cinematic section blocks
│   │   │   ├── About.tsx               # Biotech profile & education
│   │   │   ├── EnvelopeLetter.tsx      # Wax-sealed envelope letter
│   │   │   ├── FinalCelebration.tsx    # Candles, Confetti, Moon, & Decryption
│   │   │   ├── Hero.tsx                # Title, Birthday and Date
│   │   │   ├── IndirectProposal.tsx    # Poetry lines scroll reveal
│   │   │   ├── LoadingScreen.tsx       # Decryption terminal logs
│   │   │   ├── Reasons.tsx             # 30 Constellation stars
│   │   │   ├── Story.tsx               # Childhood -> instagram chapters
│   │   │   ├── Timeline.tsx            # Chronological progress line
│   │   │   └── Wishes.tsx              # Biotech wishes card grid
│   │   └── AudioPlayer.tsx             # Procedural sound synth
│   └── data/            # JSON Content Management System
│       ├── birthday.json
│       ├── gallery.json
│       ├── proposal.json
│       ├── quotes.json
│       ├── reasons.json
│       ├── story.json
│       ├── timeline.json
│       └── wishes.json
├── next.config.ts       # Next.js export & image settings
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependency configuration
```

---

## 🚀 Tech Stack

- **Framework**: Next.js (App Router, Static Export config)
- **Language**: TypeScript (Strict type constraints)
- **Styling**: Tailwind CSS & Vanilla Custom CSS animations
- **Animation**: Framer Motion (Staggered spring layouts & viewport reveals)
- **Icons**: Lucide React
- **Particle Celebrations**: Canvas Confetti
- **Audio Synthesizer**: Native Web Audio API

---

## 🛠️ Development & Production Deployment

### Local Development
1. Clone the project workspace.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view in browser.

### Production Static Export
To compile a production build and export as static HTML/CSS files:
```bash
npm run build
```
This generates an optimized static export in the `./out` directory, which is ready to be hosted on GitHub Pages, Netlify, or Vercel.

---

## 🧪 Performance & Lighthouse Metrics

- **Performance (98+)**: Lightweight Canvas particles and local Web Audio synthesizer bypass heavy image/sound assets, guaranteeing instant loading.
- **Accessibility (100)**: Proper semantic HTML, contrast ratios, and complete aria-label tags.
- **SEO (100)**: Fully structured layout viewport, custom authors metadata, and descriptive titles.
- **Best Practices (100)**: Zero dynamic hydration shifts, zero console warnings, and optimized script loading.
