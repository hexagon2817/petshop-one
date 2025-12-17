 // custom hamburger

  const toggler = document.querySelector('.navbar-toggler');
  const barsIcon = toggler.querySelector('.fa-bars');
  const closeIcon = toggler.querySelector('.fa-xmark');

  toggler.addEventListener('click', () => {
    const isOpen = toggler.getAttribute('aria-expanded') === 'true';

    if (isOpen) {
      // Menu is open → show X
      barsIcon.classList.add('d-none');
      closeIcon.classList.remove('d-none');
    } else {
      // Menu is closed → show hamburger
      barsIcon.classList.remove('d-none');
      closeIcon.classList.add('d-none');
    }
  });












document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const statusBox = document.getElementById("contactStatus");
    const submitBtn = document.getElementById("contactSubmitBtn");
    const btnSpinner = submitBtn ? submitBtn.querySelector(".btn-spinner") : null;
    const btnText = submitBtn ? submitBtn.querySelector(".btn-text") : null;
    const card = document.querySelector(".contact-card");

    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Reset previous state
      statusBox.innerHTML = "";
      const fields = form.querySelectorAll(".form-control, .form-select, .form-check-input");
      fields.forEach((field) => {
        field.classList.remove("is-invalid");
      });

      let valid = true;

      // Basic required check
      fields.forEach((field) => {
        const isRequired = field.hasAttribute("required");
        const isCheckbox = field.type === "checkbox";
        if (!isRequired) return;

        if (isCheckbox) {
          if (!field.checked) {
            field.classList.add("is-invalid");
            valid = false;
          }
        } else {
          if (!field.value.trim()) {
            field.classList.add("is-invalid");
            valid = false;
          }
        }
      });

      // Email pattern check
      const emailInput = document.getElementById("email");
      if (emailInput && emailInput.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
          emailInput.classList.add("is-invalid");
          valid = false;
        }
      }

      if (!valid) return;

      // Simulate sending state
      if (submitBtn && btnSpinner && btnText) {
        submitBtn.disabled = true;
        btnSpinner.classList.remove("d-none");
        btnText.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i>Sending...';
      }

      // Fake delay (like backend call)
      setTimeout(function () {
        // Success UI
        statusBox.innerHTML = `
          <div class="contact-alert-pill mt-2">
            <i class="fa-solid fa-circle-check"></i>
            <span>Thank you! Your message has been sent.</span>
          </div>
        `;

        // Tiny pop animation on the card
        if (card) {
          card.classList.remove("sent");
          void card.offsetWidth; // reflow to restart animation
          card.classList.add("sent");
        }

        // Reset form
        form.reset();

        // Reset button
        if (submitBtn && btnSpinner && btnText) {
          submitBtn.disabled = false;
          btnSpinner.classList.add("d-none");
          btnText.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i>Send Message';
        }
      }, 900); // you can change the time if you want
    });
  });