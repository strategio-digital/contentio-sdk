/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */

import {Field} from "../utils/FormValidator/types";
import {trackLeadGenerate} from "./Measurement";
import Axios from "../Plugins/Axios";
import {IFormValidator} from "../utils/FormValidator";

type ContactFormValues = {
    name: string,
    email: string,
    phone: string,
    message: string,
}

export default (formValidator:IFormValidator, form: HTMLFormElement | null, rules: Field[]) => {
    if (form) {
        formValidator.validate(form, rules, async () => await process(form));

        const process = async (form: HTMLFormElement) => {
            const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
            const params = Object.fromEntries(new FormData(form).entries()) as ContactFormValues;

            btn.disabled = true;
            formValidator.clearAlerts(form);

            try {
                await Axios.post('lead/create', {type: 'contactForm', params});
                formValidator.addAlert(form, false, 'Děkujeme, do 24 hodin se Vám na uvedený kontakt ozveme.');
                trackLeadGenerate();
                form.reset();
            } catch (err: any) {
                formValidator.addAlert(form, true, 'Akce se nezdařila. Zadali jste správný kontakt?');
            }

            btn.disabled = false;
        };
    }
}