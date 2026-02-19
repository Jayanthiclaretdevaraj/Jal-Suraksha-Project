*🌊 Project Jal-Suraksha: Implementation Roadmap*

*🟦 Phase 1: Foundation \& High-Contrast Scaffolding*

*Initialize Project: Create a React Native (0.70+) project and install essential dependencies (@react-native-firebase/app, firestore, auth).*



*Define Theme.js: Set up the color palette with Action Blue (#0056D2), Safety White (#FFFFFF), and Alert Red (#D32F2F).*



*Setup Typography: Implement Global Styles using Inter or Roboto (16pt body, 24pt+ headers).*



*Configure Firebase Persistence: Initialize Firestore with persistence: true and unlimited cache size to support offline-first requirements.*



*🟥 Phase 2: Core Mobile Features (ASHA Worker Workflow)*

*Build Home Screen (Action Hub):*



*Create the "Hero Card" for current area status.*



*Build the large, full-width Report New Case (Red) and View Map (Blue) buttons with 16px rounded corners.*



*Develop Symptom Reporting Form:*



*Create the 80x80dp Icon-Grid Selector for symptoms (Watery Diarrhea, Fever, Nausea, Dehydration).*



*Implement "Active State" styling (4px blue stroke) and checkmark badges upon selection.*



*Add a "Sticky" Send Report footer button.*



*Integrate Automated GPS: Configure react-native-geolocation-service to capture lat/lon (truncated to 5 decimal places) and Village Cluster ID.*



*Implement Optimistic UI: Use TanStack Query to update the local list immediately when a report is submitted.*



*🟨 Phase 3: Infrastructure \& Sync Logic*

*Payload Optimization: Standardize the JSON structure using short keys (e.g., s\_id) for 2G network compatibility.*



*Security Layer: Implement react-native-aes-crypto for AES-256 encryption of Patient Identifiable Information (PII).*



*Background Sync: Configure react-native-background-fetch to attempt a sync every 15 minutes when signal is detected.*



*Local Assets: Bundle all symptom icons as SVGs or local PNGs to ensure they load without data.*



*🟧 Phase 4: Early Warning System (EWS) \& Admin Tools*

*Cloud Functions for EWS: Write a Firebase Cloud Function to monitor if >5 cases appear in a Village Cluster within 48 hours.*



*Configure SMS Alerts: Integrate a standard SMS gateway (like Twilio or a local provider) to notify District Officers upon trigger conditions.*



*Build Live Map View:*



*Implement "Silver/High-Contrast" map styling.*



*Create pulsed markers (Red for outbreaks, Yellow for pending).*



*Sync Status UI: Add the "Syncing Later" banner and gray-scale icon states for offline mode.*



*🟩 Phase 5: Testing \& Refinement*

*2G Simulation: Test sync reliability and performance using network throttling.*



*Sunlight Legibility Test: Verify contrast ratios for "Pure Black on White" mode in bright environments.*



*Haptic Validation: Ensure heavy vibration feedback triggers only on successful submissions.*

