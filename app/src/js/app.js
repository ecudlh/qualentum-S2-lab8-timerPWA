import { LitElement, html, css } from 'lit-element';
import { TimerComponent, TimerPartComponent } from '@elenacode/timer-web-component';
import { SoundComponent } from '@elenacode/sound-player-component';
import * as logo from '../images/logos/TimerPWA-logos_transparent.png';

export class App extends LitElement {
    static properties = {
        start: {type: Number, attribute: true, reflect: true},
        sound: {type: String, attribute: true}
    }

     constructor() {
        super();
        this.start = 1500;
        this.sound = './assets/sheep.mp3';
    }

    static styles = css `
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        img {
            width: 400px;
            margin-top: 40px;
        }

        .container {
            padding: 40px;
            background-color: #fff;
        }
    `;

    _setTime() {
        const timeValue = this.shadowRoot.querySelector('#time').value;
        const timerPlayer = this.shadowRoot.querySelector('timer-component');
        this.start = Number(timeValue);
        setTimeout(() => {
            timerPlayer.reset();
        }, 100);
    }

    render() {
        return html `
            <img class="logo" src="${logo.default}" alt="TimerPWA logo">
            <div class="container">
                <div class="timer-component">
                    <timer-component direction="down" start="${this.start}" limit="0" autoreset></timer-component>
                    <sound-component sound="${this.sounnd}" id="finish-sound"></sound-component>
                </div>
                <div id="set-time">
                    <div id="set-time--input">
                        <span>Configurar</span>
                        <input type="number" id="time" value="${this.start}">
                        <span>segundos</span>
                    </div>
                    <button @click="${this._setTime}">Guardar</button>
                </div>
            </div>
        `;
    }
}