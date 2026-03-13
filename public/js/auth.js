import { auth, db } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ============================================
// SIGNUP - Create new patient or doctor account
// ============================================
async function signup(email, password, role, name, phone) {
  try {
    // Create user in Firebase Auth
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCred.user.uid;

    // Save user metadata to Firestore
    await setDoc(doc(db, 'users', uid), {
      uid: uid,
      email: email,
      name: name,
      phone: phone,
      role: role,  // "doctor" or "patient"
      createdAt: new Date(),
      profilePicUrl: ""
    });

    // Create role-specific document
    if (role === 'doctor') {
      await setDoc(doc(db, 'doctors', uid), {
        uid: uid,
        speciality: '',
        licenseId: '',
        yearsOfExperience: 0,
        phcLocation: '',
        availability: '9AM-5PM',
        consultationFee: 0
      });
    } else if (role === 'patient') {
      await setDoc(doc(db, 'patients', uid), {
        uid: uid,
        bloodGroup: '',
        diabeticHistory: false,
        chronicDiseases: [],
        currentMedications: [],
        emergencyContact: phone,
        address: ''
      });
    }

    console.log('User created successfully');
    return { success: true, uid: uid };
  } catch (error) {
    console.error('Signup error:', error.message);
    return { success: false, error: error.message };
  }
}

// ============================================
// LOGIN - Sign in patient or doctor
// ============================================
async function login(email, password) {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCred.user.uid;

    // Get user role from Firestore
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log('Login successful:', userData.role);
      return { success: true, user: userData };
    } else {
      return { success: false, error: 'User data not found' };
    }
  } catch (error) {
    console.error('Login error:', error.message);
    return { success: false, error: error.message };
  }
}

// ============================================
// GOOGLE SIGN-IN
// ============================================
async function googleSignIn(role) {
  try {
    const provider = new GoogleAuthProvider();
    const userCred = await signInWithPopup(auth, provider);
    const uid = userCred.user.uid;
    const email = userCred.user.email;
    const name = userCred.user.displayName;

    // Check if user exists
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (!userDoc.exists()) {
      // New user - create profile
      await setDoc(doc(db, 'users', uid), {
        uid: uid,
        email: email,
        name: name,
        phone: '',
        role: role,
        createdAt: new Date(),
        profilePicUrl: userCred.user.photoURL
      });

      if (role === 'doctor') {
        await setDoc(doc(db, 'doctors', uid), {
          uid: uid,
          speciality: '',
          licenseId: '',
          yearsOfExperience: 0,
          phcLocation: '',
          availability: '9AM-5PM'
        });
      } else {
        await setDoc(doc(db, 'patients', uid), {
          uid: uid,
          bloodGroup: '',
          diabeticHistory: false,
          chronicDiseases: [],
          currentMedications: [],
          emergencyContact: '',
          address: ''
        });
      }
    }

    return { success: true, uid: uid };
  } catch (error) {
    console.error('Google Sign-In error:', error.message);
    return { success: false, error: error.message };
  }
}

// ============================================
// LOGOUT
// ============================================
async function logout() {
  try {
    await signOut(auth);
    console.log('User logged out');
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error.message);
    return { success: false, error: error.message };
  }
}

// ============================================
// CHECK AUTH STATE ON PAGE LOAD
// ============================================
function checkAuthState(callback) {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is logged in
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        callback({ isLoggedIn: true, user: userData });
      }
    } else {
      // User is logged out
      callback({ isLoggedIn: false, user: null });
    }
  });
}

export { signup, login, googleSignIn, logout, checkAuthState };
