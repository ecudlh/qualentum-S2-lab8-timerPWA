import { App } from './src/js/app.js';
import './src/scss/styles.scss';
import './src/sounds/sheep.mp3';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', { type: 'module' })
        .then(() => console.log('service worker registered'))
        .catch((err) => console.log('service worker not registered', err));
}

customElements.define('app-component', App);
const app = document.getElementById('app');
app.innerHTML = '<app-component></app-component>'