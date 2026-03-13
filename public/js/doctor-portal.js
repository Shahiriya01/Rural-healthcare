import { db, auth } from './firebase-config.js';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  orderBy,
  limit,
  onSnapshot,
  Timestamp,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ============================================
// GET DOCTOR'S INCOMING APPOINTMENTS
// ============================================
async function getDoctorAppointments(doctorUid, status = null) {
  try {
    let q;
    if (status) {
      q = query(
        collection(db, 'appointments'),
        where('doctorUid', '==', doctorUid),
        where('status', '==', status),
        orderBy('appointmentDate', 'asc')
      );
    } else {
      q = query(
        collection(db, 'appointments'),
        where('doctorUid', '==', doctorUid),
        orderBy('appointmentDate', 'asc')
      );
    }
    
    const querySnapshot = await getDocs(q);
    const appointments = [];
    
    for (const doc of querySnapshot.docs) {
      const appointmentData = doc.data();
      
      // Get patient details
      const patientDoc = await getDocs(
        query(collection(db, 'users'), where('uid', '==', appointmentData.patientUid))
      );
      
      if (!patientDoc.empty) {
        const patientData = patientDoc.docs[0].data();
        
        // Get AI diagnosis from symptoms collection
        const symptomsDoc = await getDocs(
          query(
            collection(db, 'symptoms'),
            where('patientUid', '==', appointmentData.patientUid),
            orderBy('timestamp', 'desc'),
            limit(1)
          )
        );
        
        const aiDiagnosis = symptomsDoc.empty ? 'N/A' : symptomsDoc.docs[0].data().aiDiagnosis;
        const urgencyScore = symptomsDoc.empty ? 'N/A' : symptomsDoc.docs[0].data().urgencyScore;
        
        appointments.push({
          id: doc.id,
          ...appointmentData,
          patientName: patientData.name,
          patientPhone: patientData.phone,
          patientEmail: patientData.email,
          aiDiagnosis: aiDiagnosis,
          urgency: urgencyScore
        });
      }
    }
    
    return { success: true, data: appointments };
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// CONFIRM APPOINTMENT
// ============================================
async function confirmAppointment(appointmentId, doctorNotes = '') {
  try {
    await updateDoc(doc(db, 'appointments', appointmentId), {
      status: 'confirmed',
      notes: doctorNotes,
      confirmedAt: Timestamp.now()
    });
    console.log('Appointment confirmed');
    return { success: true };
  } catch (error) {
    console.error('Error confirming appointment:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// DECLINE APPOINTMENT
// ============================================
async function declineAppointment(appointmentId, reason = '') {
  try {
    await updateDoc(doc(db, 'appointments', appointmentId), {
      status: 'declined',
      declineReason: reason
    });
    console.log('Appointment declined');
    return { success: true };
  } catch (error) {
    console.error('Error declining appointment:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// ADD CLINICAL NOTES TO APPOINTMENT
// ============================================
async function addClinicalNotes(appointmentId, patientUid, diagnosis, medicines, followUpDate) {
  try {
    // Update appointment status to completed
    await updateDoc(doc(db, 'appointments', appointmentId), {
      status: 'completed',
      completedAt: Timestamp.now()
    });

    // Add to patient history
    await addDoc(collection(db, 'patientHistory'), {
      patientUid: patientUid,
      appointmentId: appointmentId,
      doctorNotes: diagnosis,
      diagnosis: diagnosis,
      medicines: medicines,
      followUpDate: followUpDate,
      timestamp: Timestamp.now()
    });

    console.log('Clinical notes added');
    return { success: true };
  } catch (error) {
    console.error('Error adding clinical notes:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// GET PATIENT DETAILS FOR DOCTOR
// ============================================
async function getPatientDetails(patientUid) {
  try {
    // Get user info
    const userDoc = await getDocs(
      query(collection(db, 'users'), where('uid', '==', patientUid))
    );
    
    // Get patient info
    const patientDoc = await getDocs(
      query(collection(db, 'patients'), where('uid', '==', patientUid))
    );

    // Get medical history
    const historyDocs = await getDocs(
      query(
        collection(db, 'patientHistory'),
        where('patientUid', '==', patientUid),
        orderBy('timestamp', 'desc'),
        limit(5)
      )
    );

    const userData = userDoc.empty ? {} : userDoc.docs[0].data();
    const patientData = patientDoc.empty ? {} : patientDoc.docs[0].data();
    const history = [];
    
    historyDocs.forEach(doc => {
      history.push(doc.data());
    });

    return {
      success: true,
      data: {
        user: userData,
        patient: patientData,
        history: history
      }
    };
  } catch (error) {
    console.error('Error fetching patient details:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// GET URGENT CASES (RED PRIORITY)
// ============================================
async function getUrgentCases(doctorUid) {
  try {
    // Get all pending appointments for this doctor
    const appointmentsQ = query(
      collection(db, 'appointments'),
      where('doctorUid', '==', doctorUid),
      where('status', '==', 'pending')
    );

    const appointmentsSnap = await getDocs(appointmentsQ);
    const urgentCases = [];

    for (const appointmentDoc of appointmentsSnap.docs) {
      const appointment = appointmentDoc.data();
      
      // Get AI diagnosis to check urgency
      const symptomsQ = query(
        collection(db, 'symptoms'),
        where('patientUid', '==', appointment.patientUid),
        orderBy('timestamp', 'desc'),
        limit(1)
      );

      const symptomsSnap = await getDocs(symptomsQ);
      if (!symptomsSnap.empty) {
        const symptom = symptomsSnap.docs[0].data();
        
        // Add to urgent if HIGH urgency
        if (symptom.urgencyScore === 'HIGH') {
          const patientQ = query(
            collection(db, 'users'),
            where('uid', '==', appointment.patientUid)
          );
          const patientSnap = await getDocs(patientQ);
          
          urgentCases.push({
            appointmentId: appointmentDoc.id,
            patientName: patientSnap.empty ? 'Unknown' : patientSnap.docs[0].data().name,
            patientPhone: patientSnap.empty ? 'N/A' : patientSnap.docs[0].data().phone,
            aiDiagnosis: symptom.aiDiagnosis,
            appointmentTime: appointment.appointmentTime,
            appointmentDate: appointment.appointmentDate
          });
        }
      }
    }

    return { success: true, data: urgentCases };
  } catch (error) {
    console.error('Error fetching urgent cases:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// LISTEN TO REAL-TIME APPOINTMENTS
// ============================================
function listenToAppointments(doctorUid, callback) {
  const q = query(
    collection(db, 'appointments'),
    where('doctorUid', '==', doctorUid)
  );

  const unsubscribe = onSnapshot(q, async (querySnapshot) => {
    const appointments = [];
    
    for (const appointmentDoc of querySnapshot.docs) {
      const appointmentData = appointmentDoc.data();
      
      // Get patient details
      const patientQ = query(
        collection(db, 'users'),
        where('uid', '==', appointmentData.patientUid)
      );
      const patientSnap = await getDocs(patientQ);
      
      if (!patientSnap.empty) {
        appointments.push({
          id: appointmentDoc.id,
          ...appointmentData,
          patientName: patientSnap.docs[0].data().name
        });
      }
    }
    
    callback(appointments);
  });

  return unsubscribe;
}

export {
  getDoctorAppointments,
  confirmAppointment,
  declineAppointment,
  addClinicalNotes,
  getPatientDetails,
  getUrgentCases,
  listenToAppointments
};
