import App from './app';
import swRegister from './swRegister';

const app = new App();
app.processJSX();

document.addEventListener('DOMContentLoaded', async () => {
  const root = document.getElementById('root');
  root.insertAdjacentElement('beforeend', app.create());
});

window.addEventListener('load', () => {
  swRegister();
});
