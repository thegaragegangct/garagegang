/* ==========================================================================
   The Garage Gang — Site Config & Behavior

   EVERYTHING you need to plug in your real info lives in the CONFIG block
   right below. Edit these values, save, and every button/link on the site
   updates automatically — you don't need to touch the HTML.
   ========================================================================== */

const CONFIG = {
  // --- Phone number ---
  // Digits only, no spaces/dashes/parens, e.g. "5550109999"
  PHONE_NUMBER_RAW: "4753529801",
  // How the number is displayed on-screen, e.g. "(555) 010-9999"
  PHONE_NUMBER_DISPLAY: "(475) 352-9801",

  // --- EmailJS ---
  // Sign up free at https://www.emailjs.com — create a Service + Template,
  // then paste your IDs/key below. The template should expect these fields:
  // from_name, from_phone, from_email, garage_size, preferred_date, message
  EMAILJS_PUBLIC_KEY: "Zm6Pe8EMcwoTQAnYG",
  EMAILJS_SERVICE_ID: "service_jo1wrpd",
  EMAILJS_TEMPLATE_ID: "template_qv2esc8",
};

/* ==========================================================================
   Below this line is site logic — you shouldn't need to edit it.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  wirePhoneLinks();
  initEmailJS();
  wireQuoteForm();
});

// Fill in every tel: link and every displayed phone number on the page
// from the single CONFIG value above.
function wirePhoneLinks() {
  document.querySelectorAll("[data-phone-link]").forEach(function (el) {
    el.setAttribute("href", "tel:" + CONFIG.PHONE_NUMBER_RAW);
  });
  document.querySelectorAll("[data-phone-display]").forEach(function (el) {
    el.textContent = CONFIG.PHONE_NUMBER_DISPLAY;
  });
}

function initEmailJS() {
  if (window.emailjs && CONFIG.EMAILJS_PUBLIC_KEY.indexOf("PLACEHOLDER") === -1) {
    emailjs.init({ publicKey: CONFIG.EMAILJS_PUBLIC_KEY });
  }
}

function wireQuoteForm() {
  const form = document.getElementById("quote-form");
  if (!form) return;

  const successBox = document.getElementById("quote-success");
  const errorBox = document.getElementById("quote-error");
  const submitBtn = document.getElementById("quote-submit");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (errorBox) errorBox.style.display = "none";

    const keysReady =
      CONFIG.EMAILJS_PUBLIC_KEY.indexOf("PLACEHOLDER") === -1 &&
      CONFIG.EMAILJS_SERVICE_ID.indexOf("PLACEHOLDER") === -1 &&
      CONFIG.EMAILJS_TEMPLATE_ID.indexOf("PLACEHOLDER") === -1;

    if (!window.emailjs || !keysReady) {
      // EmailJS keys haven't been added yet — let the site owner know instead
      // of failing silently.
      console.warn(
        "The Garage Gang: EmailJS keys are still placeholders in js/main.js — " +
        "form submissions will not send until CONFIG is filled in."
      );
      if (errorBox) {
        errorBox.textContent =
          "Booking form isn't fully connected yet — please call us instead.";
        errorBox.style.display = "block";
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }

    emailjs
      .sendForm(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_ID, form)
      .then(function () {
        form.style.display = "none";
        if (successBox) successBox.style.display = "block";
      })
      .catch(function (err) {
        console.error("EmailJS error:", err);
        if (errorBox) {
          errorBox.textContent =
            "Something went wrong sending your request — please call us instead.";
          errorBox.style.display = "block";
        }
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Submit Request";
        }
      });
  });
}
