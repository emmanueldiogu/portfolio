import "./style.css";
import "./main.css";
import { app } from "./public/js/firebase.config";
import { getDatabase, ref, push, onValue } from "firebase/database";
import "./public/js/auth";
const db = getDatabase(app);

const contactForm = document.querySelector("#contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let newFormData = {};
    formData.forEach((value, key) => {
      newFormData[key] = value;
    });
    // Save data to Firebase Realtime Database
    const contactRef = ref(db, "contacts");
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

const projectsRef = ref(db, "projects");
onValue(projectsRef, (snapshot) => {
  const projects = snapshot.val();
  const tableBody = document.querySelector("#projectRef");
  if (tableBody) {
    tableBody.innerHTML = ""; // Clear existing rows
    for (const key in projects) {
      const project = projects[key];
      const row = document.createElement("div");
      row.classList.add(
        "w-72",
        "shadow-md",
        "rounded-lg",
        "flex",
        "flex-col",
        "justify-between",
        "duration-500",
        "hover:scale-105",
        "hover:shadow-xl"
      );

      row.innerHTML = `
            <div class="rounded-t">
                <img
                src="/img/${project.project_image}"
                alt="${project.project_title}"
                class="object-contain rounded-t"
                />
            </div>
            <div class="px-4 py-3 w-72">
                <h3>${project.project_title}</h3>
                <div class="flex justify-between items-center">
                <a
                    href="${project.project_code_url}"
                    class="border-b-2 border-emerald-300 hover:border-emerald-500 w-fit transition-colors"
                    >View Code</a
                >
                <a
                    href="${project.project_view_url}"
                    class="border-b-2 border-emerald-300 hover:border-emerald-500 w-fit transition-colors"
                    >View Project</a
                >
                </div>
            </div>
                `;
      tableBody.appendChild(row);
    }
  }
});
