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
        measurement: {
            gtm_id: string,
            gtm_enabled: boolean,
        }
    }
}