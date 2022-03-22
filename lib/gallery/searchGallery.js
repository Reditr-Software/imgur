import { __awaiter } from "tslib";
import { SEARCH_GALLERY_ENDPOINT, IMGUR_API_PREFIX } from '../common/endpoints';
import { getImgurApiResponseFromResponse } from '../common/utils';
import { URL } from 'url';
const advancedParameters = [
    'q_all',
    'q_any',
    'q_exactly',
    'q_not',
    'q_type',
    'q_size_px',
];
export function constructSearchGalleryUrl(options) {
    let uri = '';
    if (options.sort) {
        uri += `/${options.sort}`;
    }
    if (options.sort === 'top' && options.window) {
        uri += `/${options.window}`;
    }
    if (options.page) {
        uri += `/${options.page}`;
    }
    const url = new URL(`${IMGUR_API_PREFIX}/${SEARCH_GALLERY_ENDPOINT}${uri}`);
    advancedParameters.forEach((param) => {
        var _a;
        if ((_a = options[param]) === null || _a === void 0 ? void 0 : _a.length) {
            url.searchParams.append(param, options[param]);
        }
    });
    if (!url.search) {
        const query = options.q || options.query;
        if (!query) {
            throw new Error('No query was provided');
        }
        url.searchParams.append('q', query);
    }
    return url;
}
export function searchGallery(client, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { pathname } = constructSearchGalleryUrl(options);
        // since we're using prefixUrl with got, we have to remove the starting slash or it'll throw
        const finalPathname = pathname.slice(1);
        return getImgurApiResponseFromResponse(yield client.request({ url: finalPathname }).catch((e) => e.response));
    });
}
