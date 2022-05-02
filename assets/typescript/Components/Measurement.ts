/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */

export default () => {
    window.measurement = {
        gtm_id: process.env.GTM_ID as string,
        gtm_enabled: process.env.GTM_ENABLED as string === 'yes',
    };

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'js': new Date()});
}

export const trackSubscribe = () => {
    window.dataLayer.push({
        'event': 'eventTracking',
        'eventCategory': 'form',
        'eventAction': 'conversion',
        'eventLabel': 'newsletter'
    });
}

export const trackLeadGenerate = () => {
    window.dataLayer.push({
        'event': 'eventTracking',
        'eventCategory': 'form',
        'eventAction': 'conversion',
        'eventLabel': 'contact'
    });
}