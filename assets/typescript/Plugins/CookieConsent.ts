/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */

import "vanilla-cookieconsent/src/cookieconsent.js";
import {enableGtmCookie, cookieType, disableGtmCookie} from "../Components/Measurement";
import axios from "axios";

export default () => {
    const cookieLogUrl = 'https://cookielog.strategio.digital';
    const cookieConsent = initCookieConsent();

    const onFirstAction = async (user_preferences: UserPreferences, cookie: SavedCookieContent) => {
        const domain = window.location.hostname;
        const response = await axios.post('/create', {
            domain,
            context: JSON.stringify(cookie)
        }, {baseURL: cookieLogUrl});

        cookieConsent.set('data', {
            value: {
                uuid: response.data.uuid,
                domain
            }
        });
    }

    const onAccept = (cookie: SavedCookieContent) => {
        cookie.level.forEach(cookieEntity => enableGtmCookie(cookieEntity as cookieType));
    }

    const onChange = async (cookie: SavedCookieContent, changed_preferences: string[]) => {
        changed_preferences.forEach(cookieEntity => cookie.level.includes(cookieEntity)
            ? enableGtmCookie(cookieEntity as cookieType)
            : disableGtmCookie(cookieEntity as cookieType)
        );

        const domain = cookie.data?.domain as string;
        const uuid = cookie.data?.uuid as string;

        await axios.post('/update', {
            domain,
            uuid,
            context: JSON.stringify(cookie)
        }, {baseURL: cookieLogUrl});
    }

    cookieConsent.run({
        onFirstAction: onFirstAction,
        onAccept: onAccept,
        onChange: onChange,
        revision: 3,
        gui_options: {
            consent_modal: {
                layout: 'box',
                position: 'bottom right',
                transition: 'slide',
                swap_buttons: true,
            },
            settings_modal: {
                layout: 'box',
                transition: 'zoom'
            }
        },
        current_lang: 'cs',
        autoclear_cookies: true,
        page_scripts: false,
        remove_cookie_tables: true,
        cookie_name: 'cc_cookie',
        cookie_expiration: 182,
        cookie_necessary_only_expiration: 182,
        languages: {
            'cs': {
                consent_modal: {
                    title: '🍪 &nbsp;Relevantní obsah a cookies',
                    description: 'Stačí odkliknout souhlas s využíváním souborů cookies a my Vám ukážeme přesně to, co Vás bude zajímat. K poskytnutým údajům máme přístup my i naši partneři, díky čemuž se Vám zobrazuje vše, co chcete vidět. Samozřejmě si také můžete nastavení upravit přesně podle Vašich představ. Děkujeme za důvěru. <button type="button" data-cc="c-settings" class="cc-link">Nastavení cookies</button>.',
                    primary_btn: {
                        text: 'Souhlasím',
                        role: 'accept_all'
                    },
                    secondary_btn: {
                        text: 'Nesouhlasím',
                        role: 'accept_necessary'
                    },
                },
                settings_modal: {
                    title: 'Nastavení cookies',
                    save_settings_btn: 'Uložit nastavení',
                    accept_all_btn: 'Přijmout vše',
                    reject_all_btn: 'Vše vypnout',
                    close_btn_label: 'Zavřít',
                    blocks: [
                        {
                            title: 'Využití cookies',
                            description: 'Používáme cookies, abychom Vám umožnili pohodlné prohlížení webu a díky analýze provozu webu neustále zlepšovali jeho funkce, výkon a použitelnost.'
                        },
                        {
                            title: 'Nezbytné cookies',
                            description: 'Tyto cookies jsou potřeba, aby web fungoval správně.',
                            toggle: {
                                value: 'necessary',
                                enabled: true,
                                readonly: true
                            }
                        },
                        {
                            title: 'Analytické cookies',
                            description: 'Pomáhají nám pochopit, jak web používáte. S jejich pomocí ho můžeme zlepšovat.',
                            toggle: {
                                value: 'analytics_storage',
                                enabled: false,
                                readonly: false
                            }
                        },
                        {
                            title: 'Reklamní a marketingové cookies',
                            description: 'Díky těmto cookies vám můžeme zobrazovat relevantní obsah a reklamy, které pro vás mohou být zajímavé a užitečné.',
                            toggle: {
                                value: 'ad_storage',
                                enabled: false,
                                readonly: false
                            }
                        }
                    ]
                }
            }
        }
    });
}
