# Bharat FreightLink Mobile App

A mobile-first transport company application prototype for India-wide logistics operations. It gives booking parties and truck owners separate login flows, current order visibility, transparent freight rates, live truck tracking, truck availability, and route ETAs.

## Features

- **Booking Party login** for customers that need to create loads, see active orders, compare rates, and track shipments.
- **Truck Owner login** for fleet partners to view assigned trucks, accept loads, and update truck availability.
- **Order display** with route, material, truck type, live status, price, and ETA.
- **Rate display** for popular all-India transport lanes.
- **Live tracking demo** that updates the selected truck marker on a stylized India route map in real time.
- **Truck availability and ETA** showing current location, availability point, time to origin, and time to destination.
- **Installable PWA shell** through `manifest.webmanifest` for a mobile-app-like experience.

## Project Structure

```text
.
├── assets/                 # SVG app icon and hero route pattern
├── scripts/                # Local static server and validation checks
├── src/                    # Application JavaScript and responsive CSS
├── index.html              # Mobile app UI shell
├── manifest.webmanifest    # PWA metadata
└── package.json            # npm scripts
```

## Run Locally

```bash
npm start
```

Open `http://localhost:4173` in a browser or mobile emulator.

## Validate

```bash
npm run validate
```
