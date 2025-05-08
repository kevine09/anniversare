// Import the functions you need from the correct Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZ1PKVcp0s8CsjpqpRrGcJC01M90wrCnI",
    authDomain: "le-monde-de-kevine.firebaseapp.com",
    projectId: "le-monde-de-kevine",
    storageBucket: "le-monde-de-kevine.firebasestorage.app",
    messagingSenderId: "452498682713",
    appId: "1:452498682713:web:8a98cc09c2749f07ff1248",
    measurementId: "G-WFYEKZDM35"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Export the services you need
export { db, serverTimestamp };