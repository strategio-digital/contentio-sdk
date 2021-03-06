/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */

import SubscribeForm from "./Components/SubscribeForm";
import ThumbGen from "./Components/ThumbGen";
import Alpine from "./Plugins/Alpine";
import FormValidator from "./Utils/FormValidator";
import CookieConsent from "./Plugins/CookieConsent";

(() => {
    ThumbGen();

    CookieConsent();

    Alpine();

    const formValidator = FormValidator();

    SubscribeForm(
        formValidator,
        document.getElementById("subscribeForm") as HTMLFormElement | null,
        []
    );
})();
