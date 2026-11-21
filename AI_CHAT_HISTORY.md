# AI Chat History: E-Waste Facility Locator

## Full Conversation

### Turn 1
**AI**

### Prompt 0: Ground rules

```
We're building "E-Waste Facility Locator", a mobile app tested only in Expo Go.

Rules for every step:
- Expo managed workflow, Expo Router, plain JavaScript (no TypeScript).
- Expo Go compatible only: no custom native modules, no dev builds.
- Simple, clean, readable code. Each file under ~120 lines, one job per file.
- No unnecessary libraries, no comments that restate the code, no dead code.
- All colours, radii, spacing, and fonts come from theme.js, with no magic values in components.
- Prefer clever small solutions (derived state, small helpers, data-driven UI) over long code.
- Only build what the current prompt asks for. Don't build ahead.
- After each step, list in 3 lines max what to check on my phone.

Design language:
- Map screen: Uber-style, pure black and white, minimal, lots of whitespace.
- Everything else (Learn, Recycle, Wallet): playful pastel editorial cards like a fintech
  "Academy" app: bold chunky grotesk headings, lilac/mint/yellow/pink/green cards,
  2px black outlines, 24px radii, rotated sticker pills, "5 min read" tags, scalloped blob shapes.
Confirm you understand. Don't write code yet.
```

### Turn 2
**AI**

### Prompt 1: Scaffold and navigation

```
Create the Expo app in the current folder using the Expo Router template and remove all demo content.
Install with `npx expo install`: react-native-maps expo-location expo-linking expo-haptics
@react-native-async-storage/async-storage react-native-svg react-native-reanimated
react-native-gesture-handler @gorhom/bottom-sheet expo-font
@expo-google-fonts/bricolage-grotesque @expo/vector-icons

Folders: app/, components/, data/, lib/, plus theme.js at the root.
Create 4 bottom tabs in app/(tabs)/: index (Map), learn, recycle, wallet, each with a placeholder
centred title. Tab bar: white, black icons, no labels, a thin top border, and the active icon
filled black. Wrap the root layout in GestureHandlerRootView and load the font in the root layout.
```

### Turn 3
**AI**

### Prompt 2: Theme and UI building blocks

```
Create theme.js with:
- colors: black, white, greys, and pastels (lilac #B9B4F5, mint #A9E5D0, yellow #F9E96B,
  pink #F7B6E6, green #1F8A4C, bg pink #FFD3F2)
- radii, spacing scale, and font names (Bricolage Grotesque 700/800 for headings, 500 for body)

Then create small reusable components in components/:
- Card.js: pastel background prop, 2px black border, 24 radius
- Sticker.js: pill label with a coloured background, black border, and a slight rotation
- Blob.js: a react-native-svg scalloped/wavy shape used as a card decoration
- Button.js: solid black pill button with white text, plus a "ghost" variant
Show them all on the Learn tab as a temporary preview so I can see the style.
```

### Turn 4
**AI**

### Prompt 3: Data and location logic

```
Create data/facilities.json with 20 facilities near [YOUR CITY]. Fields: id, name, address,
lat, lng, phone, hours ("10:00-18:00"), accepts (array from: "phones","laptops","batteries",
"appliances","tv","cables"), authorised (boolean). Use clearly marked placeholder values; I'll replace
them with verified ones.

Create lib/geo.js with a compact haversine distance function and a
`withDistance(facilities, coords)` helper that adds `km` and returns the list sorted nearest-first.
Create lib/useUserLocation.js, a hook that asks foreground permission, returns
{coords, status}, and falls back to the city centre when permission is denied.
Create lib/isOpenNow.js that parses the hours string.
Log the sorted nearest 3 to the console to verify.
```

### Turn 5
**AI**

### Prompt 4: Black-and-white map

```
Build the Map tab with react-native-maps filling the screen.
- Android: PROVIDER_GOOGLE with a customMapStyle in lib/mapStyle.js. Greyscale, no POI icons
  or labels, white roads, light grey land, mid-grey water, similar to Uber's look.
- iOS: default provider with mapType="mutedStandard".
- Hide the default location button. Show the user's position as a black dot with a white ring.
- Markers: custom View markers (black circle, white recycling icon). The selected marker is
  larger with a white ring.
- Initial region centred on the user, falling back to the city centre.
Keep the screen file short. Put the marker in components/FacilityMarker.js.
```

### Turn 6
**AI**

### Prompt 5: Uber-style bottom sheet

```
Add a @gorhom/bottom-sheet to the Map tab with snap points ["18%","45%","85%"].
- Handle bar, title "Nearby drop-off points", then a FlatList of facilities from withDistance().
- Each row (components/FacilityRow.js): name, "1.2 km · Open now" or "Closed", and
  a small black chevron. Plain white rows with hairline dividers, no pastel colours here.
- Tapping a row selects it, animates the map to its marker, and snaps the sheet to 45%.
- Tapping a marker does the same.
Keep selection state in a single useState in the screen.
```

### Turn 7
**AI**

### Prompt 6: Facility detail and navigation

```
When a facility is selected, replace the list in the bottom sheet with a detail view
(components/FacilityDetail.js):
- Name, address, distance, open/closed status
- "Accepts" as small outlined chips
- An "Authorised recycler" black pill if true
- Two big buttons: "Directions" (opens Google Maps/Apple Maps with the destination via expo-linking
  and a single URL builder in lib/openDirections.js) and "Call" (tel: link)
- A back arrow to return to the list.
Trigger a light haptic on selection.
```

### Turn 8
**AI**

### Prompt 7: Search and filter chips

```
Add a floating white search bar with a shadow at the top of the Map tab (below the safe area).
It filters the facility list by name or address as you type.
Under it, a horizontally scrollable row of filter chips built from the "accepts" values
plus "Open now". Selected chips are filled black with white text.
Implement filtering as one derived `visible` array computed from search + chips (no extra
state copies). The map markers and the list must both use `visible`.
Show a clean empty state in the sheet when nothing matches.
```

### Turn 9
**AI**

### Prompt 8: Learn tab (educational pop-ups)

```
Build the Learn tab in the pastel editorial style from my reference design.
Create data/hazards.js with 6 entries: lead, mercury, cadmium, lithium batteries, brominated
flame retardants, and "why recycle precious metals". Each has: id, title, color (pastel),
minutes, found-in, health effect, environment effect, and a one-line "what to do".
- The screen has a chunky "Academy" sticker, a heading "Knowledge is power", and a vertical list of
  big pastel Cards with the title, a "3 min read" tag, and a Blob decoration.
- Tapping a card opens a full-screen pop-up (Modal) in the same colour with large heading text,
  sections for found in / health / environment / what to do, and a black close button.
Also add a one-time "Did you know?" pop-up on the Map tab on first launch (remember with AsyncStorage).
```

### Turn 10
**AI**

### Prompt 9: Recycle tab (device value and credits)

```
Build the Recycle tab:
Create data/devices.js, a lookup table of ~12 common devices (smartphone, feature phone, laptop,
tablet, TV, charger, earbuds, power bank, etc.) with approximate grams of gold, silver, and copper.
Create lib/credits.js with one function, `pointsFor(device, condition)`, which converts
metal grams to points using a price constant and a condition multiplier (working/damaged).
UI:
- A heading "What are you recycling?", a grid of pastel device cards with emoji or icons.
- After a device is chosen, show condition toggle chips, then a big animated points number
  counting up (Reanimated or Animated) with a "metals recovered" breakdown as three small stickers.
- A "Find a drop-off point" button that switches to the Map tab.
```

### Turn 11
**AI**

### Prompt 10: Wallet and drop-off flow

```
Build the Wallet tab and a drop-off log:
- lib/useWallet.js: a small hook backed by AsyncStorage, exposing {points, history, addDropOff}.
- On the Recycle result screen add a "Confirm drop-off" button that opens a small sheet to pick a
  facility (from data/facilities.json) and then saves {device, points, facility, date}.
- Wallet tab: a large green Card showing the total points, a "Recycled so far" counter,
  a simple level badge derived from points (Seedling, Sprout, Tree), and a history list of
  pastel rows. Add an empty state.
- Success moment: a light haptic and a confetti-free celebratory sticker animation.
```

### Turn 12
**AI**

### Prompt 11: Polish and demo-readiness

```
Final polish pass, keeping the code small:
1. Location permission denied: a friendly banner on the Map tab with a "Use city centre" state.
2. Add a splash/onboarding screen with 3 swipeable pastel slides (find, learn, earn), shown once.
3. Consistent headings, safe areas, status bar style, and press feedback on all cards.
4. Remove unused files, imports, and styles. List any file over 120 lines and refactor it.
5. Write a README.md: what it is, features, how to run with `npx expo start` and Expo Go,
   data sources, and a 5-step demo script.
Do not add new features.
```

## Key Decisions

- Chosen Project: E-Waste Facility Locator, an interactive mobile application to locate authorized e-waste collection centers, calculate recovered precious metals, learn about electronic toxicities, and log recycling drop-offs.
- Chosen Stack: Expo managed workflow with Expo Router, React Native Maps, plain JavaScript, and AsyncStorage, maintaining strict compatibility with Expo Go and avoiding custom native builds.
- Design Direction: A dual aesthetic featuring a monochrome, high-contrast, whitespace-heavy Uber-style map interface alongside playful, neo-brutalist pastel cards with 2px black outlines, 24px radii, rotated sticker badges, and bold grotesk typography for educational, calculator, and wallet screens.
- Build Approach: A sequential 12-step incremental prompt plan (Prompt 0 to Prompt 11), enforcing a strict architectural discipline of keeping every file under ~120 lines with single-responsibility modularity.

## How the AI Output Was Used

Claude suggested the foundational project structure, scoping boundaries, and the sequential 12-prompt implementation blueprint. I reviewed and orchestrated the execution of these prompts using Antigravity with Gemini. All source code was generated, iteratively verified on live mobile hardware, and actively refactored to maintain strict line limits, responsive UI polish, and functional reliability.
