/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */

import {Field} from "../Utils/FormValidator/types";
import {trackSubscribe} from "./Measurement";
import Axios from "../Plugins/Axios";
import {IFormValidator} from "../Utils/FormValidator";

type SubscribeFormValues = {
    email: string,
}

export default (formValidator:IFormValidator, form: HTMLFormElement | null, rules: Field[]) => {
    if (form) {
        formValidator.validate(form, rules, async () => await process(form));

        const process = async (form: HTMLFormElement) => {
            const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
            const params = Object.fromEntries(new FormData(form).entries()) as SubscribeFormValues;

            btn.disabled = true;
            formValidator.clearAlerts(form);

            try {
                await Axios.post('newsletter/subscribe', {params});
                formValidator.addAlert(form, false, 'Skvěle, právě jste se přihlásili k odběru.');
                trackSubscribe();
                form.reset();
            } catch (err: any) {
                formValidator.addAlert(form, true, 'Akce se nezdařila. Zadali jste správný e-mail?');
            }

            btn.disabled = false;
        };
    }
}