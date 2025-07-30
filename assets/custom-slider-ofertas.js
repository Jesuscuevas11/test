document.addEventListener('DOMContentLoaded', function () {
  // Seleccionar el slider principal
  const slider = document.getElementById('slider-ofertas');
  if (!slider) {
    console.error('Slider no encontrado');
    return;
  }

  // Reorganizar la estructura del DOM correctamente
  const slides = Array.from(slider.querySelectorAll('.custom-banner'));
  const buttonContainer = slider.querySelector('.button-container');

  // Crear contenedor para los slides
  const sliderContainer = document.createElement('div');
  sliderContainer.className = 'slider-container';

  // Mover los slides al contenedor
  slides.forEach((slide) => {
    sliderContainer.appendChild(slide);
  });

  // Limpiar y reconstruir la estructura
  slider.innerHTML = '';
  slider.appendChild(sliderContainer);
  slider.appendChild(buttonContainer);

  // Variables del slider
  let currentIndex = 0;
  const slideCount = slides.length;
  let slideWidth = slider.offsetWidth;
  let isMobile = window.innerWidth <= 768; // Umbral para móvil
  let slidesToShow = isMobile ? 1 : 3; // Mostrar 1 en móvil, 3 en desktop

  // Configuración inicial del slider
  function initSlider() {
    // Determinar si estamos en móvil o desktop
    isMobile = window.innerWidth <= 768;
    slidesToShow = 1;

    // Ajustar dimensiones
    slideWidth = slider.offsetWidth / slidesToShow;
    sliderContainer.style.width = `${slideWidth * slideCount}px`;

    slides.forEach((slide) => {
      slide.style.width = `${slideWidth}px`;
      slide.style.position = 'relative';
      slide.style.display = 'inline-block'; // Para mostrar múltiples slides
    });

    goToSlide(currentIndex);
  }

  // Navegación entre slides
  function goToSlide(index) {
    // Asegurarnos de no pasar los límites
    const maxIndex = Math.max(slideCount - slidesToShow, 0);
    currentIndex = Math.min(Math.max(index, 0), maxIndex);

    sliderContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  // Event listeners para navegación
  buttonContainer.querySelector('.prev-btn').addEventListener('click', () => {
    const newIndex = currentIndex - (isMobile ? 1 : slidesToShow);
    console.log(newIndex);
    goToSlide(newIndex);
  });

  buttonContainer.querySelector('.next-btn').addEventListener('click', () => {
    const newIndex = currentIndex + (isMobile ? 1 : slidesToShow);
    goToSlide(newIndex);
  });

  // Manejar redimensionamiento con debounce para mejor performance
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      initSlider();
    }, 250);
  });

  // Inicialización final
  initSlider();

  // Soporte para el editor de Shopify
  if (typeof Shopify !== 'undefined') {
    document.addEventListener('shopify:section:load', function (event) {
      if (event.target.contains(slider)) {
        initSlider();
      }
    });
  }
});
