const form = document.getElementById("registrationForm");
const tableBody = document.querySelector("#entriesTable tbody");

// Load data on page load
document.addEventListener("DOMContentLoaded", () => {
  const entries = getEntriesFromStorage();
  entries.forEach(entry => appendEntryToTable(entry));
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const dob = document.getElementById("dob").value;
  const accepted = document.getElementById("acceptTerms").checked;

  if (!validateEmail(email)) {
    alert("Invalid email address.");
    return;
  }

  if (!validateAge(dob)) {
    alert("Age must be between 18 and 55.");
    return;
  }

  const newEntry = {
    name,
    email,
    password,
    dob,
    accepted: accepted ? "true" : "false"
  };

  const entries = getEntriesFromStorage();
  entries.push(newEntry);
  localStorage.setItem("userEntries", JSON.stringify(entries));

  appendEntryToTable(newEntry);
  form.reset();
});

function getEntriesFromStorage() {
  return JSON.parse(localStorage.getItem("userEntries")) || [];
}

function appendEntryToTable(entry) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${entry.name}</td>
    <td>${entry.email}</td>
    <td>${entry.password}</td>
    <td>${entry.dob}</td>
    <td>${entry.accepted}</td>
  `;
  tableBody.appendChild(row);
}

function validateEmail(email) {
  const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return pattern.test(email);
}

function validateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 18 && age <= 55;
}
