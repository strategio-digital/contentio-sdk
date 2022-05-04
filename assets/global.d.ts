/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */

import { Alpine as AlpineType } from 'alpinejs';

declare global {
    interface Window {
        Alpine: AlpineType,
        dataLayer: Array<object>,
        gtag: (p1:any, p2:any) => void,
        envs: {
            APP_ENV_MODE: string,
            APP_TIME_ZONE: string,
            API_URL_JS: string
            API_ACCESS_TOKEN: string,
            GTM_ID: string,
            GTM_ENABLED: string,
            CDN_ENDPOINT: string,
        }
    }
}