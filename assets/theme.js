// Shopirrr Theme JavaScript

// Cart Drawer
class CartDrawer {
  constructor() {
    this.drawer = document.getElementById('CartDrawer');
    this.overlay = document.getElementById('CartOverlay');
    this.init();
  }

  init() {
    document.querySelectorAll('[data-open-cart]').forEach(btn => {
      btn.addEventListener('click', () => this.open());
    });
    this.overlay?.addEventListener('click', () => this.close());
    document.querySelector('[data-close-cart]')?.addEventListener('click', () => this.close());
  }

  open() {
    this.drawer?.classList.add('is-open');
    this.overlay?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.drawer?.classList.remove('is-open');
    this.overlay?.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}

// Mobile Menu
class MobileMenu {
  constructor() {
    this.toggle = document.getElementById('MenuToggle');
    this.menu = document.getElementById('MobileMenu');
    this.toggle?.addEventListener('click', () => this.toggleMenu());
  }

  toggleMenu() {
    this.menu?.classList.toggle('is-open');
  }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  new CartDrawer();
  new MobileMenu();
});
