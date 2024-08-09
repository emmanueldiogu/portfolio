import { auth } from "./firebase.config";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const loginForm = document.querySelector("[data-login]");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    loginWithEmailPassword(email, password);
    loginForm.reset();
  });
}

function loginWithEmailPassword(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location.href = "/profile-admin";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error: ", errorCode, errorMessage);
    });
}

const logoutButton = document.querySelector("#authLogout");
if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  });
}
