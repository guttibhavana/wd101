const form = document.getElementById('registrationForm');
    const tableBody = document.querySelector('#entriesTable tbody');

    // Load saved entries from localStorage on page load
    window.onload = () => {
      const savedEntries = JSON.parse(localStorage.getItem("userEntries")) || [];
      savedEntries.forEach(entry => appendEntryToTable(entry));
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const dob = document.getElementById('dob').value;
      const accepted = document.getElementById('acceptTerms').checked;

      if (!validateEmail(email)) {
        alert("Invalid email address.");
        return;
      }

      const age = calculateAge(new Date(dob));
      if (age < 18 || age > 55) {
        alert("Age must be between 18 and 55.");
        return;
      }

      if (!accepted) {
        alert("You must accept the terms and conditions.");
        return;
      }

      const userEntry = {
        name,
        email,
        password,
        dob,
        accepted: accepted.toString()
      };

      // Save to localStorage
      let entries = JSON.parse(localStorage.getItem("userEntries")) || [];
      entries.push(userEntry);
      localStorage.setItem("userEntries", JSON.stringify(entries));

      appendEntryToTable(userEntry);
      form.reset();
    });

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
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
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
