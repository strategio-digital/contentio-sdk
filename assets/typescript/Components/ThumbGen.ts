/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */
import Axios from "../Plugins/Axios";

type Params = {
    path: string,
    method: string,
    quality: number,
    width: number | null
    height: number | null
}

interface onCreated {
    (params: Params, src: string): void
}

export const makeParams = (path: string): Params | null => {
    // example: _develop_contentio_app/article/56/test--thumb-[SHRINK_ONLY-80-100x100].jpeg

    const regex = /(.*)\-\-thumb\[([A-Z\_]+)\-([0-9]{1,3})\-([0-9]*)x([0-9]*)\](.*)/;
    const groups = regex.exec(path) as Array<string>;

    if (groups === null) {
        return null
    }

    const width = isNaN(parseInt(groups[4])) ? null : parseInt(groups[4]);
    const height = isNaN(parseInt(groups[5])) ? null : parseInt(groups[5]);

    return {
        path: groups[1] + groups[6], // path + extension
        method: groups[2],
        quality: parseInt(groups[3]),
        width,
        height
    }
}

export default (onCreated?: onCreated) => {
    const requestQueue: Array<string> = [];
    const loadingSvg = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHdpZHRoPSI0MHB4IiBoZWlnaHQ9IjQwcHgiIHZpZXdCb3g9IjAgMCA0MCA0MCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWw6c3BhY2U9InByZXNlcnZlIiBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEuNDE0MjE7IiB4PSIwcHgiIHk9IjBweCI+CiAgICA8ZGVmcz4KICAgICAgICA8c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWwogICAgICAgICAgICBALXdlYmtpdC1rZXlmcmFtZXMgc3BpbiB7CiAgICAgICAgICAgICAgZnJvbSB7CiAgICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpCiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIHRvIHsKICAgICAgICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTM1OWRlZykKICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgQGtleWZyYW1lcyBzcGluIHsKICAgICAgICAgICAgICBmcm9tIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpCiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIHRvIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0zNTlkZWcpCiAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIHN2ZyB7CiAgICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IDUwJSA1MCU7CiAgICAgICAgICAgICAgICAtd2Via2l0LWFuaW1hdGlvbjogc3BpbiAxLjVzIGxpbmVhciBpbmZpbml0ZTsKICAgICAgICAgICAgICAgIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuOwogICAgICAgICAgICAgICAgYW5pbWF0aW9uOiBzcGluIDEuNXMgbGluZWFyIGluZmluaXRlOwogICAgICAgICAgICB9CiAgICAgICAgXV0+PC9zdHlsZT4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJvdXRlciI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMCwwQzIyLjIwNTgsMCAyMy45OTM5LDEuNzg4MTMgMjMuOTkzOSwzLjk5MzlDMjMuOTkzOSw2LjE5OTY4IDIyLjIwNTgsNy45ODc4MSAyMCw3Ljk4NzgxQzE3Ljc5NDIsNy45ODc4MSAxNi4wMDYxLDYuMTk5NjggMTYuMDA2MSwzLjk5MzlDMTYuMDA2MSwxLjc4ODEzIDE3Ljc5NDIsMCAyMCwwWiIgc3R5bGU9ImZpbGw6YmxhY2s7Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxnPgogICAgICAgICAgICA8cGF0aCBkPSJNNS44NTc4Niw1Ljg1Nzg2QzcuNDE3NTgsNC4yOTgxNSA5Ljk0NjM4LDQuMjk4MTUgMTEuNTA2MSw1Ljg1Nzg2QzEzLjA2NTgsNy40MTc1OCAxMy4wNjU4LDkuOTQ2MzggMTEuNTA2MSwxMS41MDYxQzkuOTQ2MzgsMTMuMDY1OCA3LjQxNzU4LDEzLjA2NTggNS44NTc4NiwxMS41MDYxQzQuMjk4MTUsOS45NDYzOCA0LjI5ODE1LDcuNDE3NTggNS44NTc4Niw1Ljg1Nzg2WiIgc3R5bGU9ImZpbGw6cmdiKDIxMCwyMTAsMjEwKTsiLz4KICAgICAgICA8L2c+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMCwzMi4wMTIyQzIyLjIwNTgsMzIuMDEyMiAyMy45OTM5LDMzLjgwMDMgMjMuOTkzOSwzNi4wMDYxQzIzLjk5MzksMzguMjExOSAyMi4yMDU4LDQwIDIwLDQwQzE3Ljc5NDIsNDAgMTYuMDA2MSwzOC4yMTE5IDE2LjAwNjEsMzYuMDA2MUMxNi4wMDYxLDMzLjgwMDMgMTcuNzk0MiwzMi4wMTIyIDIwLDMyLjAxMjJaIiBzdHlsZT0iZmlsbDpyZ2IoMTMwLDEzMCwxMzApOyIvPgogICAgICAgIDwvZz4KICAgICAgICA8Zz4KICAgICAgICAgICAgPHBhdGggZD0iTTI4LjQ5MzksMjguNDkzOUMzMC4wNTM2LDI2LjkzNDIgMzIuNTgyNCwyNi45MzQyIDM0LjE0MjEsMjguNDkzOUMzNS43MDE5LDMwLjA1MzYgMzUuNzAxOSwzMi41ODI0IDM0LjE0MjEsMzQuMTQyMUMzMi41ODI0LDM1LjcwMTkgMzAuMDUzNiwzNS43MDE5IDI4LjQ5MzksMzQuMTQyMUMyNi45MzQyLDMyLjU4MjQgMjYuOTM0MiwzMC4wNTM2IDI4LjQ5MzksMjguNDkzOVoiIHN0eWxlPSJmaWxsOnJnYigxMDEsMTAxLDEwMSk7Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxnPgogICAgICAgICAgICA8cGF0aCBkPSJNMy45OTM5LDE2LjAwNjFDNi4xOTk2OCwxNi4wMDYxIDcuOTg3ODEsMTcuNzk0MiA3Ljk4NzgxLDIwQzcuOTg3ODEsMjIuMjA1OCA2LjE5OTY4LDIzLjk5MzkgMy45OTM5LDIzLjk5MzlDMS43ODgxMywyMy45OTM5IDAsMjIuMjA1OCAwLDIwQzAsMTcuNzk0MiAxLjc4ODEzLDE2LjAwNjEgMy45OTM5LDE2LjAwNjFaIiBzdHlsZT0iZmlsbDpyZ2IoMTg3LDE4NywxODcpOyIvPgogICAgICAgIDwvZz4KICAgICAgICA8Zz4KICAgICAgICAgICAgPHBhdGggZD0iTTUuODU3ODYsMjguNDkzOUM3LjQxNzU4LDI2LjkzNDIgOS45NDYzOCwyNi45MzQyIDExLjUwNjEsMjguNDkzOUMxMy4wNjU4LDMwLjA1MzYgMTMuMDY1OCwzMi41ODI0IDExLjUwNjEsMzQuMTQyMUM5Ljk0NjM4LDM1LjcwMTkgNy40MTc1OCwzNS43MDE5IDUuODU3ODYsMzQuMTQyMUM0LjI5ODE1LDMyLjU4MjQgNC4yOTgxNSwzMC4wNTM2IDUuODU3ODYsMjguNDkzOVoiIHN0eWxlPSJmaWxsOnJnYigxNjQsMTY0LDE2NCk7Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxnPgogICAgICAgICAgICA8cGF0aCBkPSJNMzYuMDA2MSwxNi4wMDYxQzM4LjIxMTksMTYuMDA2MSA0MCwxNy43OTQyIDQwLDIwQzQwLDIyLjIwNTggMzguMjExOSwyMy45OTM5IDM2LjAwNjEsMjMuOTkzOUMzMy44MDAzLDIzLjk5MzkgMzIuMDEyMiwyMi4yMDU4IDMyLjAxMjIsMjBDMzIuMDEyMiwxNy43OTQyIDMzLjgwMDMsMTYuMDA2MSAzNi4wMDYxLDE2LjAwNjFaIiBzdHlsZT0iZmlsbDpyZ2IoNzQsNzQsNzQpOyIvPgogICAgICAgIDwvZz4KICAgICAgICA8Zz4KICAgICAgICAgICAgPHBhdGggZD0iTTI4LjQ5MzksNS44NTc4NkMzMC4wNTM2LDQuMjk4MTUgMzIuNTgyNCw0LjI5ODE1IDM0LjE0MjEsNS44NTc4NkMzNS43MDE5LDcuNDE3NTggMzUuNzAxOSw5Ljk0NjM4IDM0LjE0MjEsMTEuNTA2MUMzMi41ODI0LDEzLjA2NTggMzAuMDUzNiwxMy4wNjU4IDI4LjQ5MzksMTEuNTA2MUMyNi45MzQyLDkuOTQ2MzggMjYuOTM0Miw3LjQxNzU4IDI4LjQ5MzksNS44NTc4NloiIHN0eWxlPSJmaWxsOnJnYig1MCw1MCw1MCk7Ii8+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K"
    const errorSvg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABmJLR0QA/wD/AP+gvaeTAAADXklEQVR4nO2cPWgUQRTHfwaV00pjYmEulRoEPxoLFZEUiiIG0ogIiViIItgriIhYaCFKxMIPbLQxekQUYyGxERFJI2gnWCgBEWPUpIogicW8I5Nj57K3s7u3u74fDDu78+bNm3ez/5vL7QUURVEURVEURVGyThmoAFPAbMHKFDAErI8tWzWUgYkMTDTpMgF0xJSzeVRkgGdJDdBkOoBhzBwfJjFA9bYtYvKqdGLm+DsJ59UlXnQammdLgoH8F2gCPYkrgW+A1zk+j0xcCZxhvm7k7TwV9E0kANVAT5LSwKyTeQ3MOqqBCaIamCaqgZ6oBqaIamAAqoGeqAZ6ohqYIqqBAaSlgW3AiJTuBWxvit2xEH43WH7P+gSYBvVemYU0pWz1HwNa69i+E7vLIWK6ZPn9BZRC9IH68TZlBTaiKWXgbgxjtgB91vkKoCdk39xpoL0Cq+WkwzbsCuwWux/Abak/iRifTSY10OanHK8BGz389MvxMXBP6vuBVR4+G6YZ+8BTGL1aBjwgvG7ZlICDUh8E3gJfgKXAoRD9c70PHAOOS30zcCXCeD0YzfsGvJKxH0lbv6uTRa41cKdcuyPnM0CvZRtGA5+KzYB1bavlb23EOMFvnok5DkpgCfgg18aBNXJ9oQS2An/EZkdN20e5fj5inNCkN5EomjINHJFjG3A/ZDyHMVo3DWwBTljlq9j0BXf1ijeQxXE4IbqmvAfOANeB3cDpEH2qGlcCbjlsuoBtwKijPTYNjCuBuzz63gD2AgeAi5iV5WIdsF3qLzBPjNWyB1iJSbQrgT7xRiZuDbRpx9x+9kY7SAMvSNt33C/+gGWzJEKsudFAm3HgKObWcrGIOW2rAH8ddoNybAf2OWxyvQ90MQJcrdO+DXMLg9mAuxgFPkvdtSfMnQZOAy+lXu/pz3OYJ2BXA59q2jaJjynMCnIxi3kheoHlmDnWrtbcaWCeyKUGpk0hNTBNcvdZOE9k/u+BhUI10BPVwBRRDQxANdAT1UBPVANTRDUwANVAT/S3cp7ob+VSRDUwANVATzSBnjSSwOpXiOUkAskInXKcTML5EEYbhilmEsvAc8wcK0kM0IV5mLH2QcmilQnmvv2LnQ7MP6WZzMBE4y6TmJWXWPIURVEURVEURVHi4R+oqj2JdYWISAAAAABJRU5ErkJggg==";

    const findImages = (src: string): HTMLImageElement[] => Array.from(document.querySelectorAll('img')).filter(n => n.src === src);

    const requestThumbnail = async (target: HTMLImageElement, params: Params): Promise<void> => {
        const originalSrc = target.src;

        findImages(originalSrc).forEach(image => {
            // Todo: better progress overlay && better sizing - dont use style=""
            image.style.width = '20px';
            image.style.height = '20px';
        });


        try {
            const response = await Axios.post('image/create', params);
            const src = window.envs.CDN_ENDPOINT + response.data.path;

            findImages(src).forEach((image) => {
                // Todo: better progress overlay && better sizing - dont use style=""
                image.src = src;
                image.style.width = '';
                image.style.height = '';
            })

            if (onCreated) {
                onCreated(params, src);
            }
        } catch (e) {
            console.log(e);
            // Todo: better progress overlay && better sizing - dont use style=""
            //findImages(originalSrc).forEach(image => image.src = errorSvg);
        }
    }

    document.addEventListener('error', async (event) => {
        const target = event.target as HTMLImageElement;

        if (target.tagName.toLowerCase() === 'img') {

            if (requestQueue.filter(src => target.src === src).length === 0) {
                requestQueue.push(target.src);

                const cdn = window.envs.CDN_ENDPOINT as string;

                if (target.src.startsWith(cdn)) {
                    const path = target.src.replace(cdn, '');
                    const params = makeParams(path);

                    if (params) {
                        await requestThumbnail(target, params);
                    }
                }
            }
        }

    }, true);
};