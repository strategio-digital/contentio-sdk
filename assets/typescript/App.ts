/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */

import SubscribeForm from "./Components/SubscribeForm";
import Alpine from "./Plugins/Alpine";
import Measurement from "./Components/Measurement";
import FormValidator from "./Utils/FormValidator";

(() => {
    // Alpine
    Alpine();

    // GTM
    Measurement();

    // Validator
    const formValidator = FormValidator();

    // Subscribe Form
    SubscribeForm(formValidator, document.getElementById('subscribeForm') as HTMLFormElement | null, []);
})();
