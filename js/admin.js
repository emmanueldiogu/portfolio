import { app } from "./firebase.config";
import { getDatabase, ref, push } from "firebase/database";

console.log("working");

const projectForm = document.querySelector("#projectForm");
if (projectForm) {
  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const db = getDatabase(app);
    const formData = new FormData(e.target);
    let newFormData = {};
    formData.forEach((value, key) => {
      newFormData[key] = value;
    });
    // Save data to Firebase Realtime Database
    const contactRef = ref(db, "projects");
    push(contactRef, {
      ...newFormData,
      timestamp: Date.now(),
    })
      .then(() => {
        const alertSuccess = document.querySelector("[data-alert=success]");
        alertSuccess.textContent = "✅ Message sent successfully!";
        alertSuccess.classList.remove("hidden");
        e.target.reset();
        setTimeout(() => {
          alertSuccess.classList.add("hidden");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error saving message: ", error);
        const alertDanger = document.querySelector("[data-alert=danger]");
        alertDanger.textContent =
          "⛔ Failed to send message. Please try again.";
        alertDanger.classList.remove("hidden");
        alertDanger.classList.add("flex");
        setTimeout(() => {
          alertDanger.classList.remove("flex");
          alertDanger.classList.add("hidden");
        }, 5000);
      });
  });
}
