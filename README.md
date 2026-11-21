# ReVolt ⚡ — E-Waste Facility Locator & Circular Economy

ReVolt is an editorial mobile app built with Expo and React Native that connects consumers with authorized electronic waste collection centers, educates them on toxic e-waste hazards, calculates recovered precious metals, and rewards responsible recycling with eco-points.

---

## Features

- **Minimalist Interactive Map**: Uber-style greyscale Google/Apple map featuring custom green teardrop pins with white Mobius recycling emblems, user distance calculation, real-time opening hours parser, interactive bottom sheet, floating search bar, and category filter chips.
- **Friendly Fallback Banner**: Graceful location permission handling that informs users when permission is denied and provides a one-tap action to center on Bengaluru City Centre.
- **Onboarding Walkthrough**: 3 swipeable pastel editorial slides (Find, Learn, Earn) with pagination dots and AsyncStorage persistence shown on first launch.
- **Academy (Learn Tab)**: Bold editorial cards with Bricolage Grotesque typography, sticker badges, SVG blob shapes, hardware photographs, and color-matched full-screen modals detailing chemical hazards (Lead, Mercury, Cadmium, Lithium-ion, BFRs, and Precious Metals).
- **Metals & Points Calculator (Recycle Tab)**: Interactive device grid with 12 consumer electronic gadgets, working vs. damaged condition multipliers, live animated points counter, and recovered gold, silver, and copper breakdowns.
- **Drop-off Logging & Impact Wallet**: One-tap facility drop-off logger with facility picker sheet, light haptic feedback (`expo-haptics`), celebratory spring-scale sticker animation, and an impact wallet displaying total eco-points, level badges (Seedling 🌱, Sprout 🌿, Tree 🌳), and drop-off history.

---

## How to Run with Expo Go

ReVolt runs in standard **Expo Go** on Android and iOS without requiring Xcode, Android Studio, or custom native builds.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Metro Dev Server
```bash
npx expo start
```
> **Tip for Physical Devices on Different Networks / VPNs**: If your phone and computer are on different subnets, run with tunnel mode:
> ```bash
> npx expo start --tunnel
> ```

### 3. Open in Expo Go
- **Android**: Open the **Expo Go** app and scan the QR code displayed in the terminal.
- **iOS**: Open the native **Camera** app, scan the QR code, and tap the prompt to open in Expo Go.

---

## Data Sources

1. **Drop-Off Facilities (`data/facilities.json`)**:
   - Curated directory of 20 authorized electronic waste collection hubs and clean-tech depots in Bengaluru with GPS coordinates, operating schedules, contact numbers, and accepted device categories.
2. **Hazard Guide (`data/hazards.js`)**:
   - Chemical risk profiles based on the Basel Convention, EU RoHS guidelines, and UN E-waste Monitor data covering toxicity, health risks, and proper disposal actions.
3. **Precious Metals Yields (`data/devices.js`)**:
   - Approximate gold, silver, and copper content per consumer device derived from USGS mineral commodity summaries and electronics recycling recovery metrics.

---

## 5-Step Demo Script

1. **Onboarding**: Launch the app, swipe through the 3 pastel slides (**Find Drop-off Depots**, **Understand The Impact**, and **Calculate & Earn**), and tap **Get Started**.
2. **Map & Search**: On the **Map** tab, search for `"Koramangala"` or tap the `"Open now"` filter chip. Tap any custom green recycling pin on the map to focus the facility and view its distance and operating hours in the bottom sheet.
3. **Learn Academy**: Switch to the **Learn** tab (book icon) and tap the **Cadmium (Cd)** or **Lead (Pb)** card. Review the high-res component photo, health impact, environmental risks, and recommended disposal actions in the color-matched modal.
4. **Calculate Rewards**: Navigate to the **Recycle** tab (leaf icon). Select **Laptop**, toggle between **Working** and **Damaged**, and watch the eco-points counter animate as the recovered gold, silver, and copper values calculate.
5. **Log Drop-off & Wallet**: Tap **Confirm drop-off**, select **EcoRecycle City Center**, feel the light haptic feedback, and watch the celebratory badge animate. Tap **View in Wallet** to see your updated eco-points, level badge (Seedling / Sprout / Tree), and past drop-off entry.
