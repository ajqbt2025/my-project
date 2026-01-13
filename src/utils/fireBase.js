import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBg0CVPSFEGasUZ6A4ujVmSNsUp14MKjqA",
  authDomain: "edunova-auth-38325.firebaseapp.com",
  projectId: "edunova-auth-38325",
  storageBucket: "edunova-auth-38325.firebasestorage.app",
  messagingSenderId: "713870272797",
  appId: "1:713870272797:web:4b907e3c33c2827532d9f4",
  measurementId: "G-99LPRW8LJ9",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const provider = new GoogleAuthProvider()

provider.addScope("email")
provider.addScope("profile")

// ⭐ yahi se account select hoga
provider.setCustomParameters({
  prompt: "select_account",
})

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    const [firstName, ...rest] = (user.displayName || "").split(" ")
    const lastName = rest.join(" ")

    return {
      firstName,
      lastName,
      email: user.email,
      googleId: user.uid,
      image: user.photoURL,
    }
  } catch (error) {
    console.error("Google Sign-in Error:", error)
    return null
  }
}
