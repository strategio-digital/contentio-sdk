/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */

import FormValidator from "./Utils/FormValidator";
import ContactForm from './Components/ContactForm';
import Measurement from './Components/Measurement';
import SubscribeForm from './Components/SubscribeForm';
import Alpine from './Plugins/Alpine';
import Vue from './Plugins/Vue';

(() => {
    // Alpine
    Alpine();

    // GTM
    Measurement();

    // Validator
    const formValidator = FormValidator();

    // Subscribe Form
    SubscribeForm(formValidator, document.getElementById('subscribeForm') as HTMLFormElement | null, []);

    // Contact Form
    // TODO:
    ContactForm();

    // VueJS init
    Vue();
})();
