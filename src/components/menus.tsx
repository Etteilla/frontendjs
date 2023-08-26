import React, { Component } from 'react'; // we need this to make JSX compile
import ReactShadowRoot from 'react-shadow-root';

import * as en from "../translations/en.json";
import * as fr from "../translations/fr.json";

// import twind from '../twind';
import { cssom, twind } from "@twind/core";
import config from '../twind.config';

// Use sheet and config to create an twind instance. `tw` will
// append the right CSS to our custom stylesheet.
const sheet = cssom(new CSSStyleSheet());
const tw = twind(config, sheet);


interface MenuState {
    open: boolean
}


export class EtteillaMenu extends Component<{}, MenuState> {

    translations = {
        "en": en,
        "fr": fr
    }

    override state: MenuState = {
        open: false
    };

    toggleMenu() {
        this.setState({ open: !this.state.open })
    }


    override render() {
        return (
            <ReactShadowRoot stylesheets={[sheet.target]}>
                <span className={tw("h-6 w-6")} >
                    <svg className={tw("fill-white h-6 w-6 mr-2")} viewBox="0 0 448 512">
                        <path d="M0 88c0-4 4-8 8-8h432a8 8 0 0 1 0 16H8c-4 0-8-4-8-8zm0 160c0-4 4-8 8-8h432c4 0 8 4 8 8s-4 8-8 8H8c-4 0-8-4-8-8zm440 168H8a8 8 0 0 1 0-16h432c4 0 8 4 8 8s-4 8-8 8z" />
                    </svg>
                    <svg className={tw("fill-white h-6")} viewBox="0 0 369.3 502.1">
                    <path d="M186.8 332.9a101.5 101.5 0 1 1-144.2-140 106.4 106.4 0 0 0 144.2 140Z"/><path d="M183.6 332.9a101.5 101.5 0 1 0 144.2-140 106.4 106.4 0 0 1-144.2 140Z"/><path d="M275.3 241.2H286L274.4 294H89.2v-6.4h12.3c4 0 7.2-3.2 7.2-7.2V60.7c0-4-3.3-7.2-7.2-7.2H89.2v-6.4h185.2L286 100h-10.7l-35.9-46.4H159c-4 0-7.2 3.2-7.2 7.2v106.7h53.8c9.6 0 17.4-7.8 17.4-17.4v-9.5h6.3v58.9H223V191c0-9.6-7.8-17.4-17.4-17.4h-53.8v106.7c0 4 3.2 7.2 7.2 7.2h80.4l35.9-46.4Z"/><path d="m184.6 0-29.8 38.3h8.6L184.6 11l21.2 27.2h8.6L184.6 0ZM99.8 109l-46.2 59.4-1.7 2.1 4.3 5.5 43.6 56.1v-11l-39.3-50.6L99.8 120v-11Zm8.9 123.4v11.1l39.2 50.5h8.6l-47.8-61.6Zm97 70.4-21 27.3-21.2-27.3h-8.6l25.4 32.7.1.3 2 2.6 2.2 2.7.1-.1 2.6-3.3 1.7-2.2v-.1l25.4-32.6h-8.6Zm110-134.3L233.2 62.4h-8.6l84.1 108.1-84.2 108.3h8.6l80-102.7 4.2-5.6-1.6-2ZM212.7 294h8.6l5-6.4h-8.7l-5 6.4Zm-104-50.5 39.2 50.5h8.6l-47.8-61.6v11.1Zm0-11v11l39.2 50.5h8.6l-47.8-61.6Zm39.2-185.3-39.2 50.4v11l47.8-61.4H148Zm73.4 0h-8.6l5 6.3h8.6l-5-6.3Z"/><path d="M104.4 378.1a105 105 0 0 1-82.4-169l31.6-40.7 5.3 4.2-31.6 40.6a98.2 98.2 0 0 0 89.1 157.4 97.2 97.2 0 0 0 65.5-37.1l5.4 4.2a104 104 0 0 1-82.9 40.4Z"/><path d="M264.9 378.1a104 104 0 0 1-82.9-40.4l5.4-4.2a97.3 97.3 0 0 0 65.5 37c26 3.3 51.8-4 72.5-20.3a98.2 98.2 0 0 0 16.6-137l-31.6-40.6 5.3-4.1 31.6 40.5A105 105 0 0 1 265 378.1Z"/><circle cx="185.6" cy="480" r="22.1"/><path d="M240 408.2a84.4 84.4 0 0 0-136.3 77.3 92.2 92.2 0 0 1 167.2.3c4-28.5-6.8-58.3-30.9-77.6Z"/>
                    </svg>
                </span>
                <div id="darkoverlay" onClick={this.toggleMenu} className={tw("hidden")} ></div>
            </ReactShadowRoot >
        );
    }
}
