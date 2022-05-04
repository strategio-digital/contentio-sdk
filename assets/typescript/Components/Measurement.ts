/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */

export default () => {
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