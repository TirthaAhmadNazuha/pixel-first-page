import { BaseComponent } from 'amber';
import { SUGGESTIONS_KEY } from '../../config';

const ListComponent = class extends BaseComponent {
  constructor() {
    super();
    const suggestions = window.localStorage.getItem(SUGGESTIONS_KEY);
    this.dataSuggestons = suggestions !== null ? JSON.parse(suggestions).data : [];
  }

  render() {
    return (
      <div className="list-search"></div>
    );
  }

  search(val) {
    const suggestions = this.dataSuggestons
      .filter((suggestion) => suggestion.toLowerCase().includes(val.toLowerCase()))
      .map((item) => <div className="item" onClick={(_, elem) => {
        if (this.checkLink(elem.textContent)) {
          window.open('http://' + elem.textContent, '_blank', 'noreferrer');
        } else window.open('https://www.google.com/search?q=' + elem.textContent, '_blank', 'noreferrer');
      }}>{item}</div>);
    if (suggestions.length > 0) {
      this.element.style.display = 'flex';
      this.element.replaceChildren(...suggestions);
    } else this.element.style.display = 'none';
  }

  init(elem, checkLink) {
    this.focusElem = elem;
    this.checkLink = checkLink;

    elem.addEventListener('focusin', () => {
      this.element.style.display = 'flex';
    });
    elem.addEventListener('focusout', () => {
      this.element.style.opacity = 0;
      setTimeout(() => {
        this.element.style.display = 'none';
        this.element.style.opacity = 1;
      }, 400);
    });

  }
};
const List = new ListComponent();

export default List;
