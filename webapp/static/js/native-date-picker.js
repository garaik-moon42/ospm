/**
 * @param {HTMLInputElement} input
 */
function enableNativeDatePicker(input) {
  // Inject date input before date picker
  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.value = pm3DateToISO(input.value);
  input.parentNode.insertBefore(dateInput, input);

  input.addEventListener("change", () => {
    dateInput.value = pm3DateToISO(input.value);
  });

  dateInput.addEventListener("change", () => {
    input.value = isoDateToPM3(dateInput.value);
  });

  // Hides original input
  input.style.display = "none";
  // Hides button following input
  const next = input.nextElementSibling;
  const nextNext = next.nextElementSibling;

  if (next.textContent === "...") {
    next.style.display = "none";
  }

  if (nextNext.textContent === " - ") {
    nextNext.onclick = () => {
      dateInput.value = "";
      input.value = "";
      return false;
    };
  }

  // Overrides
}

/**
 * Converts "YYYY.MM.DD." to ISO date "YYYY-MM-DD"
 * @param {string} date
 */
function pm3DateToISO(date) {
  const parts = date.split(".");
  return `${parts[0]}-${parts[1]}-${parts[2]}`;
}

/**
 * Converts ISO date "YYYY-MM-DD" to "YYYY.MM.DD."
 * @param {string} date
 */
function isoDateToPM3(date) {
  const parts = date.split("-");
  return `${parts[0]}.${parts[1]}.${parts[2]}.`;
}
