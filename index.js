const form = document.getElementById('registrationForm');
const tableBody = document.querySelector('#entriesTable tbody');

// Load entries from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
  const entries = getEntriesFromStorage();
  entries.forEach(entry => appendEntryToTable(entry));
});

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const accepted = document.getElementById('acceptTerms').checked;

  // Validate email
  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Validate age
  const age = calculateAge(new Date(dob));
  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55.");
    return;
  }

  const userEntry = {
    name,
    email,
    password,
    dob,
    accepted: accepted ? "true" : "false"
  };

  const entries = getEntriesFromStorage();
  entries.push(userEntry);
  localStorage.setItem("userEntries", JSON.stringify(entries));

  appendEntryToTable(userEntry);
  form.reset();
});

function getEntriesFromStorage() {
  return JSON.parse(localStorage.getItem("userEntries")) || [];
}

function appendEntryToTable(entry) {
  const row = document.createElement('tr');
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

function calculateAge(dob) {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}
