import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  connectFirestoreEmulator,
  enableMultiTabIndexedDbPersistence
} from 'firebase/firestore'
import {
  getAuth,
  connectAuthEmulator
  // signInWithCredential,
  // EmailAuthProvider
} from 'firebase/auth'

// the values to initialize the firebase app can be found in your firebase project
const firebaseConfig = {
  apiKey: 'AIzaSyCDQaq4-ShhGwr-rnGYEJ7JcQ6rAAOBXY4',
  authDomain: 'inc-be-project.firebaseapp.com',
  projectId: 'inc-be-project',
  storageBucket: 'inc-be-project.appspot.com',
  messagingSenderId: '127227560265',
  appId: '1:127227560265:web:e4349e372b0f694fc19a98',
  measurementId: 'G-W6MVMR4QTL'
}

const initFirebase = async () => {
  try {
    initializeApp(firebaseConfig)
    const firestore = getFirestore()
    const auth = getAuth()

    // if (process.env.NODE_ENV !== "production") {
    //   connectAuthEmulator(auth, "http://localhost:9099");
    //   connectFirestoreEmulator(firestore, "localhost", 8080);
    //   enableMultiTabIndexedDbPersistence(firestore);
    /**
     * The following code logins the user automatically to speed up development.
     * For this to work you first need to create a user and then run the command
     * yarn emulator:export, then import the data when starting the emulator
     * yarn firebase emulators:start --only firestore,auth --import=firestore_mock_data
     */
    // signInWithCredential(
    //   auth,
    //   EmailAuthProvider.credential('john@doe.com', '123123')
    // )
    // }
  } catch (err) {
    console.error(err)
    return err
  }
}

export default initFirebase
