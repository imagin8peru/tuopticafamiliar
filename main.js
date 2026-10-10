document.addEventListener('DOMContentLoaded', () => {
  // Carrusel de marcas: pausa manual y preferencias de movimiento.
  const brandCarousel = document.querySelector('.brand-carousel');
  const carouselToggle = document.querySelector('.brand-carousel-toggle');
  if (brandCarousel && carouselToggle) {
    carouselToggle.hidden = false;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const setPaused = paused => {
      brandCarousel.classList.toggle('is-paused', paused);
      carouselToggle.setAttribute('aria-pressed', String(paused));
      carouselToggle.setAttribute('aria-label', paused ? 'Reanudar carrusel de marcas' : 'Pausar carrusel de marcas');
      carouselToggle.textContent = paused ? 'Reanudar' : 'Pausar';
    };
    const applyMotionPreference = () => {
      carouselToggle.hidden = motionPreference.matches;
      setPaused(motionPreference.matches);
    };
    carouselToggle.addEventListener('click', () => {
      setPaused(!brandCarousel.classList.contains('is-paused'));
    });
    motionPreference.addEventListener('change', applyMotionPreference);
    applyMotionPreference();
  }

  // ==========================================================================
  // 1. Menú Móvil (Hamburger Menu)
  // ==========================================================================
  const burgerBtn = document.querySelector('.burger-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuBackdrop = document.querySelector('.menu-backdrop');
  
  if (burgerBtn && mobileMenu) {
    const toggleMenu = () => {
      burgerBtn.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      if (menuBackdrop) menuBackdrop.classList.toggle('open');
      
      // Bloquear scroll de la página al abrir menú
      if (mobileMenu.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    burgerBtn.addEventListener('click', toggleMenu);
    if (menuBackdrop) menuBackdrop.addEventListener('click', toggleMenu);
    
    // Cerrar menú al hacer clic en un enlace móvil
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('open')) {
          toggleMenu();
        }
      });
    });
  }

  // ==========================================================================
  // 2. Resaltado Dinámico de Enlaces de Navegación Activos
  // ==========================================================================
  const currentPath = window.location.pathname;
  const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (currentPage === href || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ==========================================================================
  // 3. Manejo de Formularios y Redirección a WhatsApp
  // ==========================================================================
  
  // Número de WhatsApp de la Óptica (puedes cambiarlo al real del cliente)
  const WHATSAPP_PHONE = '51962768359'; 

  // Formulario de Citas (contacto.html)
  const appointmentForm = document.getElementById('appointmentForm');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value.trim();

      if (!name || !phone || !date || !time) {
        alert('Por favor, complete todos los campos obligatorios para agendar su cita.');
        return;
      }

      // Crear mensaje de WhatsApp
      let text = `Hola *Tu Óptica Familiar*, me gustaría agendar una cita:\n\n`;
      text += `👤 *Nombre:* ${name}\n`;
      text += `📞 *Teléfono:* ${phone}\n`;
      text += `📅 *Fecha:* ${date}\n`;
      text += `⏰ *Hora:* ${time}\n`;
      text += `👁️ *Servicio:* ${service}\n`;
      if (message) text += `💬 *Mensaje:* ${message}\n`;

      const encodedText = encodeURIComponent(text);
      const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodedText}`;
      
      // Abrir en pestaña nueva
      window.open(url, '_blank');
      appointmentForm.reset();
    });
  }

  // Formulario de Convenios Corporativos (convenios.html)
  const corporateForm = document.getElementById('corporateForm');
  if (corporateForm) {
    corporateForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const company = document.getElementById('company').value.trim();
      const contactName = document.getElementById('contactName').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const employees = document.getElementById('employees').value;
      const details = document.getElementById('details').value.trim();

      if (!company || !contactName || !email || !phone) {
        alert('Por favor, complete los datos obligatorios para registrar su solicitud de convenio.');
        return;
      }

      // Crear mensaje de WhatsApp
      let text = `Hola *Tu Óptica Familiar*, solicito información para un *Convenio Corporativo*:\n\n`;
      text += `🏢 *Empresa:* ${company}\n`;
      text += `👤 *Contacto:* ${contactName}\n`;
      text += `📧 *Correo:* ${email}\n`;
      text += `📞 *Teléfono:* ${phone}\n`;
      text += `👥 *N° Colaboradores:* ${employees}\n`;
      if (details) text += `📝 *Detalles:* ${details}\n`;

      const encodedText = encodeURIComponent(text);
      const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodedText}`;

      window.open(url, '_blank');
      corporateForm.reset();
    });
  }
});
