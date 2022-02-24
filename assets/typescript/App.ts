/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */

import SubscribeForm from "./Components/SubscribeForm";
import SpamProtection from "./Components/SpamProtection";
import ContactForm from "./Components/ContactForm";
import Alpine from "./Plugins/Alpine";
import Measurement from "./Components/Measurement";

(() => {
    // Alpine
    Alpine();

    // GTM
    Measurement();

    // Forms
    SpamProtection();
    SubscribeForm();
    ContactForm();
})();
