/* Focus In Care — site scripts (no dependencies) */
(function () {
  "use strict";

  var isSpanish = document.documentElement.lang.indexOf("es") === 0;

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        toggle.focus();
      }
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Contact form ---------- */
  var form = document.getElementById("contact-form");
  if (!form) return;

  var t = isSpanish ? {
    required: "Este campo es obligatorio.",
    email: "Ingrese un correo electrónico válido.",
    phone: "Ingrese un número de teléfono válido.",
    sending: "Enviando…",
    success: "¡Gracias! Recibimos su mensaje y le responderemos pronto.",
    mailto: "Se abrirá su programa de correo con el mensaje listo para enviar. Si no se abre, escríbanos a inservice@focusincaretc.com.",
    fail: "No pudimos enviar su mensaje. Llámenos al (305) 801-9847 o escriba a inservice@focusincaretc.com.",
    subject: "Solicitud desde el sitio web"
  } : {
    required: "This field is required.",
    email: "Please enter a valid email address.",
    phone: "Please enter a valid phone number.",
    sending: "Sending…",
    success: "Thank you! We received your message and will be in touch shortly.",
    mailto: "Your email app will open with the message ready to send. If it doesn't, email us at inservice@focusincaretc.com.",
    fail: "We couldn't send your message. Please call (305) 801-9847 or email inservice@focusincaretc.com.",
    subject: "Website inquiry"
  };

  // Pre-select a service when arriving from a link like contact.html?service=cpr
  var params = new URLSearchParams(window.location.search);
  var preset = params.get("service");
  var select = form.querySelector("select[name='service']");
  if (preset && select && select.querySelector("option[value='" + preset + "']")) {
    select.value = preset;
  }

  function setError(field, msg) {
    var wrap = field.closest(".field");
    if (!wrap) return;
    var err = wrap.querySelector(".error");
    wrap.classList.toggle("has-error", !!msg);
    field.setAttribute("aria-invalid", msg ? "true" : "false");
    if (err) err.textContent = msg || "";
  }

  function validate() {
    var ok = true;
    form.querySelectorAll("input, select, textarea").forEach(function (f) {
      if (f.classList.contains("hp-input") || f.type === "hidden") return;
      var v = f.value.trim();
      var msg = "";
      if (f.required && !v) msg = t.required;
      else if (v && f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) msg = t.email;
      else if (v && f.type === "tel" && v.replace(/\D/g, "").length < 10) msg = t.phone;
      setError(f, msg);
      if (msg && ok) { f.focus(); ok = false; }
    });
    return ok;
  }

  function showStatus(msg, isError) {
    var status = form.querySelector(".form__status");
    if (!status) {
      status = document.createElement("div");
      status.className = "form__status";
      status.setAttribute("role", "status");
      form.appendChild(status);
    }
    status.classList.toggle("is-error", !!isError);
    status.textContent = msg;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    // Honeypot: bots fill hidden fields, people don't.
    var hp = form.querySelector(".hp-input");
    if (hp && hp.value) return;
    if (!validate()) return;

    var data = new FormData(form);
    var endpoint = form.getAttribute("data-endpoint");

    if (endpoint) {
      // A form service (e.g. Formspree) is configured — post to it.
      var btn = form.querySelector("button[type='submit']");
      var label = btn.textContent;
      btn.disabled = true;
      btn.textContent = t.sending;
      fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          form.reset();
          showStatus(t.success);
        })
        .catch(function () { showStatus(t.fail, true); })
        .finally(function () { btn.disabled = false; btn.textContent = label; });
      return;
    }

    // No endpoint yet: fall back to opening the visitor's email app.
    var serviceText = select ? select.options[select.selectedIndex].text : "";
    var lines = [];
    form.querySelectorAll("[name]").forEach(function (f) {
      if (f.classList.contains("hp-input") || f.name === "message") return;
      var label = form.querySelector("label[for='" + f.id + "']");
      var val = f.name === "service" ? serviceText : f.value.trim();
      if (val) lines.push((label ? label.textContent.replace(/\(.*\)/, "").trim() : f.name) + ": " + val);
    });
    lines.push("", data.get("message") || "");
    var href = "mailto:inservice@focusincaretc.com" +
      "?subject=" + encodeURIComponent(t.subject + (serviceText ? " — " + serviceText : "")) +
      "&body=" + encodeURIComponent(lines.join("\n"));
    window.location.href = href;
    showStatus(t.mailto);
  });

  form.querySelectorAll("input, select, textarea").forEach(function (f) {
    f.addEventListener("input", function () { if (f.getAttribute("aria-invalid") === "true") setError(f, ""); });
  });
})();
