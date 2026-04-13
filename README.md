Campus Safety Buddy

A mobile‑first safety companion for students travelling on or around campus.
Built with React + TypeScript + Vite, the app provides real‑time tracking, breadcrumb route history, camera‑based wellbeing check‑ins, and emergency contact management — all running entirely in the browser using modern HTML5 hardware APIs.

Features
Real‑Time Tracking

    Uses navigator.geolocation.watchPosition()

    Streams live GPS coordinates

    Saves breadcrumb points per session

    Generates session summaries

Camera‑Based Wellbeing Check‑Ins

    Uses getUserMedia() for live camera preview

    Captures photos

    Compresses images to prevent iOS storage crashes

    Stores check‑ins with timestamp + coordinates

Emergency Contacts

    Add, edit, and delete trusted contacts

    Stored per user in LocalStorage

LocalStorage Persistence

All data is stored offline per user:

trackingSessions_<userId>
trackingPoints_<userId>
checkins_<userId>
contacts_<userId>
user

Session Expiry System

    Auto‑logout after inactivity

    Neon “Session Expired” modal

    Timer pauses while tracking is active

Mobile‑First UI

    Tailwind CSS

    Responsive layout

    Designed for real‑world mobile use

Tech Stack

    React + TypeScript + Vite

    React Router

    Tailwind CSS

    LocalStorage (offline persistence)

    HTML5 Geolocation API

    HTML5 Camera API

    Vercel Deployment

Installation & Setup
Requirements

    Node.js (v18+ recommended)

    Git

    Modern browser (Chrome, Safari, Edge)

    HTTPS required for Camera & Geolocation APIs

1. Clone the Repository
git clone https://github.com/BeardedRaider/campus-safety-buddy.git
cd campus-safety-buddy

2. Install Dependencies
npm install

3. Start the Development Server
npm run dev

App will be available at:
http://localhost:5173

Running on Mobile

    Ensure your phone and laptop are on the same Wi‑Fi network

    Open the local Vite URL on your phone

    Accept camera and location permissions

    Add to Home Screen (PWA‑style behaviour)

Deployment

The app is deployed on Vercel, providing:

    Automatic HTTPS

    Global CDN

    SPA routing

    Fast mobile performance

To deploy your own version:
npm run build

Upload the dist/ folder to Vercel or link your GitHub repo.

src/
 ├── components/
 ├── context/
 │    └── AuthProvider.tsx
 ├── hooks/
 │    ├── useTracking.ts
 │    ├── useTrackingHistory.ts
 │    ├── useCheckIns.ts
 │    ├── useContacts.ts
 ├── pages/
 │    ├── Home.tsx
 │    ├── Tracking.tsx
 │    ├── History.tsx
 │    ├── SessionViewer.tsx
 │    ├── CheckIns.tsx
 │    ├── Contacts.tsx
 │    ├── Login.tsx
 │    ├── Register.tsx
 └── main.tsx

Known Issues

    iOS Safari has strict storage limits — large images may trigger quota errors

    Camera permissions may require manual enabling in device settings

    Background tab behaviour may pause tracking depending on device

Future Improvements

    Real‑time location sharing

    Push notifications

    Cloud backup

    Map‑based route viewer

    Multi‑device sync

👤 Author

Shane Crossman  
B01740631
University of the West of Scotland
2025/26

License

This project was by Shane Crossman
for educational and academic purposes.
You may fork or reference it, but please credit the original author.
Created for the COMP10013 – Dynamic Web Technologies module 
at the University of the West of Scotland.
