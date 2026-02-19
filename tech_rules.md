*1. Core Tech Stack \& Architecture*

*Framework: React Native (0.70+) using Functional Components and Hooks.*



*Database: Firebase Firestore (NoSQL) with Persistence Enabled.*



*State Management: TanStack Query (React Query) for server state and synchronization management.*



*Storage: Redux Persist or WatermelonDB for heavy-duty local relational data if complex offline filtering is required.*



*2. Offline-First Syncing Rules*

*To meet the requirement for 99% data sync reliability:*



*Firestore Persistence: Must be initialized globally to allow the app to read/write while offline.*



*JavaScript*

*// Firebase initialization rule*

*firestore().settings({ persistence: true, cacheSizeBytes: firestore.CACHE\_SIZE\_UNLIMITED });*

*Optimistic UI: All "Report New Case" actions must update the local UI immediately using "Optimistic Updates" before the Firebase promise resolves.*



*Conflict Resolution: Use Last-Write-Wins (LWW) for symptom reporting, as field data is generally additive rather than collaborative.*



*Background Sync: Use react-native-background-fetch to trigger a sync attempt every 15 minutes if the device is back within a 2G/3G coverage area.*



*3. 2G Network \& Performance Optimization*

*To ensure high performance on "Edge" networks in Rural Northeast India:*



*Payload Minimization:*



*Rule: Standardize JSON payloads. Use short keys (e.g., s\_id for symptom\_id) to reduce byte size.*



*Rule: Prohibit sending raw GPS objects. Send only lat and lon truncated to 5 decimal places.*



*Image Handling: \* All symptom icons must be bundled as SVGs or locally stored PNGs to avoid any network requests for UI elements.*



*Lazy Loading: Implement FlatList with windowSize limited to 5 to prevent memory spikes on low-RAM (2GB) devices.*



*4. Data Security \& Integrity*

*Encryption: Patient Identifiable Information (PII) must be encrypted using react-native-aes-crypto before being stored in the local Firestore cache.*



*GPS Logic: Use react-native-geolocation-service with highAccuracy: false when in 2G areas to save battery while maintaining "Village Cluster" accuracy.*



*5. Coding Standards for High-Contrast UI*

*Dynamic Theming: All color constants must be pulled from a Theme.js file to support the "Sunlight Mode" toggle.*



*JavaScript*

*export const COLORS = {*

  *actionBlue: '#0056D2',*

  *safetyWhite: '#FFFFFF',*

  *alertRed: '#D32F2F', // For Report New Case button*

*};*

*Touch Targets: Every interactive icon or button must have a minimum hit box of 48x48dp to ensure usability during field movement.*

