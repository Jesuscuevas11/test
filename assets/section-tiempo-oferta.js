document.addEventListener('DOMContentLoaded', function () {
  // Configura la fecha de finalización de la oferta (año, mes-1, día, hora, minuto)
  const offerEndDate = new Date();
  offerEndDate.setDate(offerEndDate.getDate() + 3); // Oferta válida por 3 días desde hoy

  function updateCountdown() {
    const now = new Date();
    const difference = offerEndDate - now;

    if (difference <= 0) {
      // La oferta ha expirado
      document.querySelector('.countdown-timer').innerHTML =
        '<div class="expired-message">¡La oferta ha terminado!</div>';
      return;
    }

    // Calcular días, horas, minutos y segundos
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Actualizar el DOM
    document.querySelector('.days').textContent = days.toString().padStart(2, '0');
    document.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
    document.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
    document.querySelector('.seconds').textContent = seconds.toString().padStart(2, '0');
  }

  // Actualizar el contador cada segundo
  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);

  // Detener el intervalo cuando la página no está visible para optimizar recursos
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      clearInterval(countdownInterval);
    } else {
      updateCountdown();
      countdownInterval = setInterval(updateCountdown, 1000);
    }
  });
});
