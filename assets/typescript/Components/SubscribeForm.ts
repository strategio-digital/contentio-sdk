/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */

import Axios from "../Plugins/Axios";
import {isReady} from "./SpamProtection";
import {trackSubscribe} from "./Measurement";

export default () => {
    const form = document.getElementById('subscribeForm') as HTMLFormElement;
    const alerts = document.getElementById('subscribeForm-alerts') as HTMLDivElement;

    if (!form) {
        return 0;
    }

    const dangerIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-exclamation-circle-fill me-2" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
        </svg>`;

    const message = (type: string, message: string) => {
        alerts.innerHTML = `<div class="bg-light text-${type} fw-bold mb-3 p-3 rounded-3">${type === 'danger' ? dangerIcon : ''}${message}</div>`;
    }

    const clearMessages = () => alerts.innerHTML = '';

    const processForm = async (event: Event) => {
        const target = event.target as HTMLFormElement;

        const formDataEntries = new FormData(target).entries();
        const values = Object.fromEntries(formDataEntries);
        const email = values.email as string;

        try {
            clearMessages();
            await Axios.post('newsletter/subscribe', { email: email.trim() });
            message('success', 'Skvěle, právě jste se přihlásili k odběru.');
            target.reset();
            trackSubscribe();
        } catch (err:any) {
            message('danger', 'Akce se nezdařila. Zadali jste správný e-mail?');
        }
    };

    form.addEventListener('submit', async event => {
        event.preventDefault();

        if (isReady()) {
            return await processForm(event);
        }

        return message('danger', 'Prosím vyčkejte 15 vteřin a odešlete formulář znovu.');
    });
}