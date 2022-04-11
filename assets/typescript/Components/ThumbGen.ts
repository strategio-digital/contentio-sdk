/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */

import Axios from "./../Plugins/Axios";

export default () => {
    document.querySelectorAll("[data-thumb]").forEach(async (node) => {
        const image = node as HTMLImageElement;

        image.onerror = async () => {
            const params = JSON.parse(image.dataset.thumb as string);

            try {
                const apiResponse = await Axios.post('image/create', params);
                image.src = process.env.CDN_ENDPOINT + apiResponse.data.path;
                console.info('Thumbnail ' + image.src + ' was not found on CDN, but it was created right now. Try to refresh the page and error 403 will be gone.');
            } catch (e) {}
        }
    });
};
