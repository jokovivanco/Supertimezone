import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';
import SearchInitiator from '../utils/SearchInitiator';

class App {
  constructor({ content, navLinks, search }) {
    this._content = content;
    this._navLinks = navLinks;
    this._search = search;

    this._initializeApp();
  }

  _initializeApp() {
    SearchInitiator.init({ search: this._search });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    this._navLinks.forEach((navLink) => {
      const nav = navLink.textContent === 'Home' ? '' : navLink.textContent.toLowerCase();
      if (`/${nav}` === url) {
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    });
    const page = routes[url] ? routes[url] : routes['/notFound'];
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
