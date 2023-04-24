import 'regenerator-runtime';

import '../styles/main.css';
import '../styles/scss/styles.scss';

// Import all of Bootstrap's JS
import 'bootstrap';

import App from './view';

const app = new App({
  content: document.querySelector('#content'),
  navLinks: document.querySelectorAll('.nav-link'),
  search: document.querySelector('#search'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});
