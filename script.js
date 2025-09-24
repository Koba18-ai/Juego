const draggables = document.querySelectorAll(".draggable");
const dropzones = document.querySelectorAll(".dropzone");
const mensaje = document.getElementById("mensaje");

draggables.forEach(drag => {
  drag.addEventListener("dragstart", () => {
    drag.classList.add("dragging");
  });
  drag.addEventListener("dragend", () => {
    drag.classList.remove("dragging");
  });
});

dropzones.forEach(zone => {
  zone.addEventListener("dragover", e => {
    e.preventDefault();
    zone.classList.add("over");
  });

  zone.addEventListener("dragleave", () => {
    zone.classList.remove("over");
  });

  zone.addEventListener("drop", e => {
    e.preventDefault();
    const dragged = document.querySelector(".dragging");
    if (!dragged) return;

    const password = dragged.textContent;
    const type = zone.dataset.type;

    const seguras = ["Password2024!", "!S3gur@Clave99"];
    const inseguras = ["123456", "Qwerty", "Fabian123", "admin"];

    if ((type === "segura" && seguras.includes(password)) ||
        (type === "insegura" && inseguras.includes(password))) {
      zone.appendChild(dragged);
      mensaje.textContent = "🎉 ¡Correcto!";
      mensaje.style.color = "green";
    } else {
      mensaje.textContent = "❌ Incorrecto, inténtalo otra vez.";
      mensaje.style.color = "red";
    }

    zone.classList.remove("over");
  });
});
