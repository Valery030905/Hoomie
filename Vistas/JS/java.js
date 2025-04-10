document.addEventListener("DOMContentLoaded", function () {
    // ----- Carrusel -----
    const carousel = document.querySelector('.carousel');
    if (carousel) {
      const items = Array.from(carousel.children);
      const totalItems = items.length;
      const visibleItems = 3;
      const itemWidth = 190;
      let index = 0;
  
      function moveCarousel(direction) {
        if (direction === 'next') {
          index = (index + 1) % totalItems;
        } else {
          index = (index - 1 + totalItems) % totalItems;
        }
        carousel.style.transition = "transform 0.5s ease-in-out";
        carousel.style.transform = `translateX(-${index * itemWidth}px)`;
      }
  
      document.getElementById('prevBtn')?.addEventListener('click', () => moveCarousel('prev'));
      document.getElementById('nextBtn')?.addEventListener('click', () => moveCarousel('next'));
    }
  
    // ----- Anuncio flotante -----
    const anuncio = document.getElementById("anuncio");
    if (anuncio) {
      setTimeout(() => {
        anuncio.classList.add("mostrar");
      }, 800);
    }
  
    window.cerrarAnuncio = function () {
      if (anuncio) {
        anuncio.classList.remove("mostrar");
      }
    }
  
    // ----- Modal Formulario -----
    const modal = document.getElementById("formModal");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.querySelector(".close");
    const steps = document.querySelectorAll(".form-step");
    const nextBtns = document.querySelectorAll(".next");
    const backBtns = document.querySelectorAll(".back");
    const progress = document.getElementById("progress");
  
    let currentStep = 0;
  
    function showStep(step) {
      steps.forEach((s, i) => {
        s.classList.toggle("active", i === step);
      });
      if (progress) {
        progress.style.width = ((step + 1) / steps.length) * 100 + "%";
      }
    }
  
    if (openModalBtn && modal) {
      openModalBtn.onclick = () => {
        modal.style.display = "flex";
        showStep(currentStep);
      };
    }
  
    if (closeModalBtn && modal) {
      closeModalBtn.onclick = () => {
        modal.style.display = "none";
      };
    }
  
    window.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    };
  
    nextBtns.forEach((btn, i) => {
      const input = steps[i].querySelector("input, textarea");
      if (input) {
        input.addEventListener("input", () => {
          btn.disabled = !input.value.trim();
        });
  
        btn.onclick = () => {
          if (input.value.trim()) {
            currentStep++;
            showStep(currentStep);
          }
        };
      }
    });
  
    backBtns.forEach((btn) => {
      btn.onclick = () => {
        currentStep--;
        showStep(currentStep);
      };
    });
  
    const form = document.getElementById("multiStepForm");
    if (form && modal) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Formulario enviado con éxito 🎉");
        modal.style.display = "none";
      });
    }
  });
  