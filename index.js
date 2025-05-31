const form = document.getElementById('registrationForm');
    const tableBody = document.querySelector('#entriesTable tbody');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const dob = document.getElementById('dob').value;
      const accepted = document.getElementById('acceptTerms').checked;

      // Validate age
      const age = calculateAge(new Date(dob));
      if (age < 18 || age > 55) {
        alert('Age must be between 18 and 55');
        return;
      }

      if (!accepted) {
        alert('You must accept the terms and conditions');
        return;
      }

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${password}</td>
        <td>${dob}</td>
        <td>${accepted}</td>
      `;
      tableBody.appendChild(row);
      form.reset();
    });

    function calculateAge(dob) {
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      return age;
    }
