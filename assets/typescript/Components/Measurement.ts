/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */


export type cookieType = 'ad_storage' | 'analytics_storage' | 'necessary';

export default () => {
    window.dataLayer = window.dataLayer || [];

    disableAllGtmCookies(false);
    loadGtmScripts();
}

function gtag() {
    window.dataLayer.push(arguments);
}


const loadGtmScripts = () => {
    window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
    if (window.envs.GTM_ENABLED === 'yes') {
        const f = document.getElementsByTagName('script')[0] as HTMLScriptElement;
        const j = document.createElement('script') as HTMLScriptElement;
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + window.envs.GTM_ID;
        f.parentNode?.insertBefore(j, f);
    }
}

const disableAllGtmCookies = (pushToDataLayer: boolean) => {
    //@ts-ignore
    gtag('consent', 'default', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'personalization_storage': 'denied'
    });

    if (pushToDataLayer) {
        window.dataLayer.push({'event': 'consent-update'});
    }
}

export const enableGtmCookie = (type: cookieType) => {
    const text = '{"' + type + '": "granted"}';
    //@ts-ignore
    gtag('consent', 'update', JSON.parse(text));
    window.dataLayer.push({'event': 'consent-update'});
}

export const disableGtmCookie = (type: cookieType) => {
    const text = '{"' + type + '": "denied"}'
    //@ts-ignore
    gtag('consent', 'update', JSON.parse(text));
    window.dataLayer.push({'event': 'consent-update'});
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