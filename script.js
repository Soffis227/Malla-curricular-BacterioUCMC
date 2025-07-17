document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  // Estado interno de los ramos
  const estadoRamos = {};

  // Inicializar estado de cada ramo
  ramos.forEach(ramo => {
    const id = ramo.dataset.id;
    const requisitos = ramo.dataset.prerrequisitos.trim().split(" ").filter(Boolean);
    estadoRamos[id] = {
      aprobado: false,
      requisitos: requisitos
    };

    if (requisitos.length > 0) {
      ramo.classList.add("bloqueado");
    }
  });

  // Actualiza qué ramos están desbloqueados
  function actualizarRamos() {
    ramos.forEach(ramo => {
      const id = ramo.dataset.id;
      const { aprobado, requisitos } = estadoRamos[id];

      if (aprobado) return; // ya aprobado, ignorar

      const desbloqueado = requisitos.every(req => estadoRamos[req]?.aprobado);
      if (desbloqueado) {
        ramo.classList.remove("bloqueado");
      }
    });
  }

  // Al hacer clic en un ramo
  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      const id = ramo.dataset.id;
      const estado = estadoRamos[id];

      // Si está bloqueado o ya aprobado, no hacer nada
      if (ramo.classList.contains("bloqueado") || estado.aprobado) return;

      estado.aprobado = true;
      ramo.classList.add("aprobado");

      // Actualizar el resto según los nuevos estados
      actualizarRamos();
    });
  });

  // Llamar al inicio para desbloquear los primeros posibles
  actualizarRamos();
});

