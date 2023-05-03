import { BaseComponent } from 'amber';
import '../styles/index.sass';
import bgImg from '../images/learn2-pixel.jpg';
import SearchBox from './component/search-box';

const App = class extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="app">
        <div className="content">
          <header>
            <div id="heading">
              <h1><b>Hello</b></h1>
            </div>
          </header>
          <main>
            <SearchBox />
          </main>
        </div>
        <div className="bg">
          <img src={bgImg} alt="" />
        </div>
      </div >
    );
  }

  onConnected() {
    const headingText = ['have', 'you', 'get', 'good', 'day'];
    const heading = this.element.querySelector('#heading');
    heading.style.width = heading.offsetWidth + 'px';
    const header = this.element.querySelector('header');

    setTimeout(() => {
      heading.children[0].append(' Tirtha');
      heading.style.width = heading.children[0].offsetWidth + 'px';
      heading.addEventListener('transitionend', () => {
        heading.style.scale = '.5';
        heading.children[0].style.transform = 'translate(0, -40px)';
        heading.children[0].addEventListener('transitionend', () => {
          const text2 = document.createElement('h2');
          text2.classList.add('heading2');
          header.append(text2);
          let time = 0;
          headingText.forEach((str) => {
            setTimeout(() => {
              const span = document.createElement('span');
              span.innerText = str;
              text2.append(span);
              const w = span.offsetWidth + 'px';
              span.style.width = '0';
              setTimeout(() => {
                span.style.opacity = '1';
                span.style.width = w;
              }, 200);
            }, time);
            time += 360;
          });
        });
      });
    }, 400);
  }
};

export default App;
