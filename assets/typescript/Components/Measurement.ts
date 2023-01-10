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

export const trackSubscribe = (eventLabel: string = 'newsletter') => {
    window.dataLayer.push({
        'event': 'eventTracking',
        'eventCategory': 'form',
        'eventAction': 'conversion',
        'eventLabel': eventLabel
    });
}

export const trackLeadGenerate = (eventLabel: string = 'contact') => {
    window.dataLayer.push({
        'event': 'eventTracking',
        'eventCategory': 'form',
        'eventAction': 'conversion',
        'eventLabel': eventLabel
    });
}

export const trackOnePurchase = (productId: number, productName: string, productCategory: string, orderId: number, priceWithTax: number, priceWithoutTax: number, tax: number): void => {
    // UA - https://developers.google.com/tag-manager/enhanced-ecommerce#purchases
    // GA4 - https://developers.google.com/tag-manager/ecommerce-ga4#measure_purchases
    // GTAG - https://developers.google.com/tag-platform/gtagjs/reference/events#purchase
    window.dataLayer.push({
        event: 'purchase',
        ecommerce: {
            purchase: {
                actionField: {
                    id: orderId,
                    revenue: priceWithoutTax,
                    tax: tax
                },
                products: [{
                    name: productName,
                    id: productId,
                    price: priceWithTax,
                    category: productCategory,
                    quantity: 1
                }]
            }
        }
    });
}