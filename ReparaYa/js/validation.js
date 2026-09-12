// validation.js — validación del formulario "Agendar cita"
// Campos obligatorios, formato de email y teléfono, mensajes de error,
// manejo de eventos submit/blur/input.

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-cita");
  if (!form) return;

  const formStatus = document.getElementById("form-status");

  // Expresiones simples y suficientes para validación de formato en cliente.
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const PHONE_RE = /^[0-9]{7,10}$/; // acepta fijo o celular sin espacios

  // Reglas por campo: cada una recibe el valor ya "trim" y devuelve
  // un mensaje de error (string) o null si es válido.
  const rules = {
    nombre: (v) => {
      if (!v) return "Escribe tu nombre completo.";
      if (v.length < 3) return "El nombre debe tener al menos 3 caracteres.";
      return null;
    },
    email: (v) => {
      if (!v) return "Escribe tu correo electrónico.";
      if (!EMAIL_RE.test(v)) return "El correo no tiene un formato válido (ej: nombre@dominio.com).";
      return null;
    },
    telefono: (v) => {
      if (!v) return "Escribe un número de contacto.";
      if (!PHONE_RE.test(v)) return "El teléfono debe tener entre 7 y 10 dígitos, sin espacios ni guiones.";
      return null;
    },
    dispositivo: (v) => {
      if (!v) return "Selecciona el tipo de dispositivo.";
      return null;
    },
    falla: (v) => {
      if (!v) return "Cuéntanos qué falla presenta el equipo.";
      if (v.length < 10) return "Danos un poco más de detalle (mínimo 10 caracteres).";
      return null;
    },
  };

  function getField(name) {
    return form.querySelector(`[name="${name}"]`);
  }

  function showError(name, message) {
    const field = getField(name);
    const wrapper = field.closest(".field");
    const errorEl = wrapper.querySelector(".error-msg");
    wrapper.classList.add("has-error");
    errorEl.textContent = message;
  }

  function clearError(name) {
    const field = getField(name);
    const wrapper = field.closest(".field");
    wrapper.classList.remove("has-error");
    wrapper.querySelector(".error-msg").textContent = "";
  }

  function validateField(name) {
    const field = getField(name);
    const value = field.value.trim();
    const error = rules[name](value);
    if (error) {
      showError(name, error);
      return false;
    }
    clearError(name);
    return true;
  }

  // Validar en tiempo real cuando el usuario sale del campo (blur)
  // y limpiar el error apenas empieza a corregirlo (input).
  Object.keys(rules).forEach((name) => {
    const field = getField(name);
    if (!field) return;

    field.addEventListener("blur", () => validateField(name));
    field.addEventListener("input", () => {
      const wrapper = field.closest(".field");
      if (wrapper.classList.contains("has-error")) {
        validateField(name);
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;
    Object.keys(rules).forEach((name) => {
      if (!validateField(name)) isValid = false;
    });

    formStatus.classList.remove("show", "success", "error");

    if (!isValid) {
      formStatus.textContent = "Revisa los campos marcados en rojo antes de enviar la solicitud.";
      formStatus.classList.add("show", "error");
      // Llevar el foco al primer campo con error, para accesibilidad.
      const firstError = form.querySelector(".has-error input, .has-error select, .has-error textarea");
      if (firstError) firstError.focus();
      return;
    }

    const nombre = getField("nombre").value.trim();
    formStatus.textContent = `Listo, ${nombre}. Tu solicitud de cita quedó registrada. Te contactaremos pronto para confirmar el horario.`;
    formStatus.classList.add("show", "success");
    form.reset();
  });
});
