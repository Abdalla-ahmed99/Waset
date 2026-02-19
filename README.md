# Waset (React + Vite)

Waset is a community platform built with React and Vite. It provides authentication, a user dashboard, posts and comments, service directories (restaurants, supermarkets, pharmacies, doctors), housing listings, a tour/map view, and an AI chat assistant. The app uses Firebase (Auth + Firestore) for backend and integrates various UI libraries.

## Tech Stack
- React 19 + Vite 6
- React Router 7
- Redux Toolkit
- Firebase Auth + Firestore
- Material UI, Bootstrap, Swiper, Slick Carousel
- Leaflet + React Leaflet
- ApexCharts + react-apexcharts
- OpenAI JS client for Chat AI

## Quick Start
- Prerequisites: Node.js 18+
- Install: `npm install`
- Development: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`
- Preview build: `npm run preview`

See scripts in [package.json](file:///d:/Abdalla/New%20folder/New%20folder%20(2)/Waset/package.json#L6-L11).

## Configuration
- Firebase: update your project credentials in [firebaseconfig.js](file:///d:/Abdalla/New%20folder/New%20folder%20(2)/Waset/src/firebaseconfig.js#L6-L19). Prefer environment variables (e.g. `VITE_FIREBASE_API_KEY`) via Vite and avoid committing secrets.
- OpenAI: the Chat AI feature is implemented in [ChatAi.jsx](file:///d:/Abdalla/New%20folder/New%20folder%20(2)/Waset/src/page/ChatAi.jsx). Provide a valid API key securely. For production, use a server-side proxy and do not expose keys in the browser.

## Project Structure
- App entry: [main.jsx](file:///d:/Abdalla/New%20folder/New%20folder%20(2)/Waset/src/main.jsx) and [App.jsx](file:///d:/Abdalla/New%20folder/New%20folder%20(2)/Waset/src/App.jsx)
- Routing and guards: [App.jsx](file:///d:/Abdalla/New%20folder/New%20folder%20(2)/Waset/src/App.jsx), [PrivateDashboard.jsx](file:///d:/Abdalla/New%20folder/New%20folder%20(2)/Waset/src/PrivateDashboard.jsx)
- State management: [Redux/Store.js](file:///d:/Abdalla/New%20folder/New%20folder%20(2)/Waset/src/Redux/Store.js), [Redux/CurrentUser.js](file:///d:/Abdalla/New%20folder/New%20folder%20(2)/Waset/src/Redux/CurrentUser.js), [Redux/UserDashboard.js](file:///d:/Abdalla/New%20folder/New%20folder%20(2)/Waset/src/Redux/UserDashboard.js)
- Contexts: [context/LoadingContext.jsx](file:///d:/Abdalla/New%20folder/New%20folder%20(2)/Waset/src/context/LoadingContext.jsx)
- UI components: [Components](file:///d:/Abdalla/New%20folder/New%20folder%20(2)/Waset/src/Components) (NavBar, Footer, Dashboard, SideBar, LoadingBar, SigninDashboard, etc.)
- Pages: [page](file:///d:/Abdalla/New%20folder/New%20folder%20(2)/Waset/src/page) (Home, Login, Signup, Profile, Community, Services, Housing, Tour, ContactUs, DoctorsPage, PharmaciesPage, SupermarketsPage, ForgotPassword, YourMessage, pagesDashboard/*)
- Assets: [assets](file:///d:/Abdalla/New%20folder/New%20folder%20(2)/Waset/src/assets), [service_imgs](file:///d:/Abdalla/New%20folder/New%20folder%20(2)/Waset/src/service_imgs)

## Routing Overview
Main routes are defined in [App.jsx](file:///d:/Abdalla/New%20folder/New%20folder%20(2)/Waset/src/App.jsx#L63-L90):
- `/` Login
- `/Signup` Signup
- `/home` Home
- `/Profile` Profile
- `/AboutUs` About Us
- `/Services` Services
- `/housing` Housing
- `/tour` Tour
- `/Community` Community
- `/ChatAi` Chat AI
- `/Profileform` Profile form
- `/post/:id` Post details
- `/contact` Contact Us
- `/dashboard` User dashboard (guarded)
- `/AdminManagment` Admin management (guarded)
- `/Posts` Posts (guarded)
- `/settings` Settings (guarded)
- `/SigninDashboard` Sign-in dashboard
- `/RestaurantsPage` Restaurants
- `/PharmaciesPage` Pharmacies
- `/DoctorsPage` Doctors
- `/SupermarketsPage` Supermarkets
- `/ForgotPassword` Forgot password
- `/YourMessage` Messages

## Linting
ESLint is configured in [eslint.config.js](file:///d:/Abdalla/New%20folder/New%20folder%20(2)/Waset/eslint.config.js). Run `npm run lint`.

## Notes
 - Do not commit API keys or secrets. Use environment variables and server-side APIs for sensitive operations.
 - Images and static assets live under `src/assets` and `src/service_imgs`.
 - (Implemented real-time user-to-user messaging system using Firebase Firestore.)
