document.addEventListener('DOMContentLoaded', function() {
    // nav y clases
    const nav = document.createElement('nav');
    nav.classList.add('navbar', 'navbar-expand-lg');
  
    // contenedor div y sus clases
    const container = document.createElement('div');
    container.classList.add('container', 'd-flex', 'justify-content-between', 'align-items-center', 'position-relative', 'flex-nowrap');
  
    // logo y anchor
    const logoLink = document.createElement('a');
    logoLink.href = 'index.html';
    logoLink.classList.add('logo-container')
  
    const logoImg = document.createElement('img');
    logoImg.src = './imagenes/logo.png';
    logoImg.alt = 'Logo';
    logoImg.classList.add('img-fluid');
  
    logoLink.appendChild(logoImg);
  
    // toggler del responsive
    const navbarToggler = document.createElement('button');
    navbarToggler.classList.add('navbar-toggler', 'ms-auto');
    navbarToggler.type = 'button';
    navbarToggler.setAttribute('data-bs-toggle', 'offcanvas');
    navbarToggler.setAttribute('data-bs-target', '#offcanvasNavbar');
    navbarToggler.setAttribute('aria-controls', 'offcanvasNavbar');
    navbarToggler.setAttribute('aria-label', 'Toggle navigation');
    navbarToggler.id = 'offcanvasNavbarLabel';
  
    const togglerIcon = document.createElement('span');
    togglerIcon.classList.add('navbar-toggler-icon');
    navbarToggler.appendChild(togglerIcon);
  
    // offcanvas
    const offcanvas = document.createElement('div');
    offcanvas.classList.add('offcanvas', 'offcanvas-end');
    offcanvas.id = 'offcanvasNavbar';
    offcanvas.setAttribute('tabindex', '-1');
    offcanvas.setAttribute('aria-labelledby', 'offcanvasNavbarLabel');
  
    // contenido del offcanvas
    const offcanvasHeader = document.createElement('div');
    offcanvasHeader.classList.add('offcanvas-header');
  
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.classList.add('btn-close');
    closeButton.setAttribute('data-bs-dismiss', 'offcanvas');
    closeButton.setAttribute('aria-label', 'Close');
    offcanvasHeader.appendChild(closeButton);
  
    const offcanvasBody = document.createElement('div');
    offcanvasBody.classList.add('offcanvas-body');
  
    // menu de nav
    const navbarNav = document.createElement('ul');
    navbarNav.classList.add('navbar-nav', 'justify-content-end', 'flex-grow-1', 'pe-3');
  
    // creo los LI
    const menuItems = [
      { href: './index.html', text: 'Inicio' },      
      { href: '#productos', text: 'Productos' },
      { href: '#nosotros', text: 'Nosotros' },
      { href: '#contacto', text: 'Contacto' }
    ];
  
    menuItems.forEach(item => {
      const listItem = document.createElement('li');
      listItem.classList.add('nav-item');
  
      const link = document.createElement('a');
      link.classList.add('nav-link');
      link.href = item.href;
      link.textContent = item.text;
  
      listItem.appendChild(link);
      navbarNav.appendChild(listItem);
    });
  
    // Añado todo a los contenedores
    offcanvasBody.appendChild(navbarNav);
    offcanvas.appendChild(offcanvasHeader);
    offcanvas.appendChild(offcanvasBody);
  
    // añado los elementos al contenedor principal
    container.appendChild(logoLink);
    container.appendChild(navbarToggler);
    container.appendChild(offcanvas);
  
    nav.appendChild(container);
  
    // selecciono el ID de mi html 
    const navbarContainer = document.querySelector('#navbar-container');
    if (navbarContainer) {
      navbarContainer.appendChild(nav);
    }
  });
  