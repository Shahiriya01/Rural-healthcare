// Firebase Configuration - Get these from Firebase Console
// https://console.firebase.google.com

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyA8UWrhdgtPOPAzXtCjm0xyVRr76Sz4RfI",
  authDomain: "rural-ai-health-firebase.firebaseapp.com",
  projectId: "rural-ai-health-firebase",
  storageBucket: "rural-ai-health-firebase.firebasestorage.app",
  messagingSenderId: "950110656886",
  appId: "1:950110656886:web:5ad4daea8611b640e00257",
  measurementId: "G-Y0J0MDPMRW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, app };
