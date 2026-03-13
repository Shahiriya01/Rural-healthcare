import { db, auth } from './firebase-config.js';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  orderBy,
  limit,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ============================================
// GET PATIENT'S UPCOMING APPOINTMENTS
// ============================================
async function getPatientAppointments(userId) {
  try {
    const q = query(
      collection(db, 'appointments'),
      where('patientUid', '==', userId),
      orderBy('appointmentDate', 'asc')
    );
    const querySnapshot = await getDocs(q);
    
    const appointments = [];
    querySnapshot.forEach((doc) => {
      appointments.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data: appointments };
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// GET AVAILABLE DOCTORS
// ============================================
async function getAvailableDoctors() {
  try {
    const q = query(
      collection(db, 'doctors'),
      where('availability', '!=', '')
    );
    const querySnapshot = await getDocs(q);
    
    const doctors = [];
    for (const docSnap of querySnapshot.docs) {
      const doctorData = docSnap.data();
      // Get user details
      const userDoc = await getDocs(
        query(collection(db, 'users'), where('uid', '==', doctorData.uid))
      );
      if (!userDoc.empty) {
        const userData = userDoc.docs[0].data();
        doctors.push({
          id: docSnap.id,
          ...doctorData,
          name: userData.name,
          phone: userData.phone,
          profilePic: userData.profilePicUrl
        });
      }
    }
    
    return { success: true, data: doctors };
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// BOOK APPOINTMENT
// ============================================
async function bookAppointment(patientUid, doctorUid, date, time, reason) {
  try {
    const appointmentRef = await addDoc(collection(db, 'appointments'), {
      patientUid: patientUid,
      doctorUid: doctorUid,
      appointmentDate: date,
      appointmentTime: time,
      reason: reason,
      status: 'pending',
      createdAt: new Date(),
      notes: ''
    });

    console.log('Appointment booked:', appointmentRef.id);
    return { success: true, appointmentId: appointmentRef.id };
  } catch (error) {
    console.error('Error booking appointment:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// GET PATIENT MEDICAL HISTORY
// ============================================
async function getPatientHistory(userId) {
  try {
    const q = query(
      collection(db, 'patientHistory'),
      where('patientUid', '==', userId),
      orderBy('timestamp', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const history = [];
    querySnapshot.forEach((doc) => {
      history.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data: history };
  } catch (error) {
    console.error('Error fetching history:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// REAL-TIME LISTEN TO APPOINTMENTS
// ============================================
function listenToAppointments(userId, callback) {
  const q = query(
    collection(db, 'appointments'),
    where('patientUid', '==', userId)
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const appointments = [];
    querySnapshot.forEach((doc) => {
      appointments.push({ id: doc.id, ...doc.data() });
    });
    callback(appointments);
  });

  return unsubscribe;
}

// ============================================
// CANCEL APPOINTMENT
// ============================================
async function cancelAppointment(appointmentId) {
  try {
    await updateDoc(doc(db, 'appointments', appointmentId), {
      status: 'cancelled'
    });
    console.log('Appointment cancelled');
    return { success: true };
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// UPDATE PATIENT PROFILE
// ============================================
async function updatePatientProfile(userId, profileData) {
  try {
    await updateDoc(doc(db, 'patients', userId), profileData);
    console.log('Profile updated');
    return { success: true };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { success: false, error: error.message };
  }
}

export {
  getPatientAppointments,
  getAvailableDoctors,
  bookAppointment,
  getPatientHistory,
  listenToAppointments,
  cancelAppointment,
  updatePatientProfile
};
