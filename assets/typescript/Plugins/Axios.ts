/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */

import axios from "axios";

const Axios = axios.create({
    baseURL: process.env.API_URL_JS,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Api-Access-Token': process.env.API_ACCESS_TOKEN as string
    },
});

export default Axios;