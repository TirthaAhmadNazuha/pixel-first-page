import { BaseComponent, usingState } from 'amber';
import './style.sass';
import List from './list';
import { SUGGESTIONS_KEY } from '../../config';


const SearchBoxs = class extends BaseComponent {
  render() {
    return (
      <>
        <div className="search-box" style="opacity: 0;">
          <input type="text" placeholder="Search and open" />
        </div>
        <List />
      </>
    );
  }

  onConnected() {
    /** @type {HTMLInputElement} */
    const input = this.element[0].children[0];
    setTimeout(() => {
      this.element[0].removeAttribute('style');
      input.focus();
    }, 200);

    /** @param {string} val */
    this.checkLink = (val) => {
      if (!val.length) return false;
      const text = val.split('.');
      if (text.length > 1 && !val.trim().includes(' ')) {
        const path = text[text.length - 1].split('/');
        if (path[0].length < 5 && path[0].length > 1 && path.find((str) => str !== '')) {
          return true;
        }
      }
      return false;
    };

    List.init(input, this.checkLink);

    input.addEventListener('keyup', (e) => {
      /** @type {string} */
      const val = e.target.value;
      if (val.length > 0) {
        List.search(val.trim());
        if (this.checkLink(val)) {
          input.classList.add('link');
          if (e.key === 'Enter') {
            List.dataSuggestons.push(val.trim());
            let savedSugestions = window.localStorage.getItem(SUGGESTIONS_KEY);
            if (window.localStorage.getItem(SUGGESTIONS_KEY) !== null) {
              savedSugestions = JSON.parse(savedSugestions);
              if (!savedSugestions.data.find((item) => item === val.trim())) savedSugestions.data.push(val.trim());
              window.localStorage.setItem(SUGGESTIONS_KEY, JSON.stringify(savedSugestions));
            } else {
              window.localStorage.setItem(SUGGESTIONS_KEY, JSON.stringify({ data: [val.trim()] }));
            }
            window.open('http://' + val.trim(), '_blank', 'noreferrer');
          }
        } else {
          input.classList.remove('link');
          if (e.key === 'Enter') {
            window.open('https://www.google.com/search?q=' + val, '_blank', 'noreferrer');
          }
        }
      }
    });

  }
};
const SearchBox = new SearchBoxs();
SearchBox.processJSX();

export default SearchBox;
