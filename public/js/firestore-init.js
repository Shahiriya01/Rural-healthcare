// File: public/js/firestore-init.js
import { db } from './firebase-config.js';
import { collection, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Create users collection with sample data
async function initializeSampleData() {
  try {
    // Add sample user
    await setDoc(doc(db, 'users', 'user_001'), {
      uid: 'user_001',
      role: 'patient',
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '+919876543210',
      profilePicUrl: '',
      createdAt: new Date()
    });

    // Add sample patient
    await setDoc(doc(db, 'patients', 'user_001'), {
      uid: 'user_001',
      bloodGroup: 'O+',
      diabeticHistory: false,
      chronicDiseases: [],
      currentMedications: [],
      emergencyContact: '+919876543210',
      address: 'Village Manupur, Surat'
    });

    console.log('Sample data created successfully!');
  } catch (error) {
    console.error('Error creating data:', error);
  }
}

export { initializeSampleData };
