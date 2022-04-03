/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */

import ContactForm from './Components/ContactForm';
import Measurement from './Components/Measurement';
import SubscribeForm from './Components/SubscribeForm';
import Alpine from './Plugins/Alpine';
import Vue from './Plugins/Vue';
import FormValidator from './Utils/FormValidator';

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
    ContactForm(formValidator, document.getElementById('contactForm') as HTMLFormElement | null, []);

    // VueJS
    Vue();
})();
