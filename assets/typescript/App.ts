/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */

import FormValidator from "./Utils/FormValidator";
import VueCart from '../vue/cart/src/main';
import ContactForm from './Components/ContactForm';
import Measurement from './Components/Measurement';
import SubscribeForm from './Components/SubscribeForm';
import Alpine from './Plugins/Alpine';

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

    // Cart init
    if (document.getElementById('vueCart')) {
        VueCart();
    }
})();
