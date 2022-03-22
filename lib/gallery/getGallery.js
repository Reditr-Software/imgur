import { __awaiter } from "tslib";
import { GALLERY_ENDPOINT, IMGUR_API_PREFIX } from '../common/endpoints';
import { URL } from 'url';
import { getImgurApiResponseFromResponse } from '../common/utils';
const defaultOptions = {
    section: 'hot',
    sort: 'viral',
};
export function constructGalleryUrl(options) {
    const mergedOptions = Object.assign({}, defaultOptions, options);
    let uri = `${mergedOptions.section}`;
    if (mergedOptions.sort) {
        uri += `/${mergedOptions.sort}`;
    }
    if (mergedOptions.section === 'top' && mergedOptions.window) {
        uri += `/${mergedOptions.window}`;
    }
    if (mergedOptions.page) {
        uri += `/${mergedOptions.page}`;
    }
    const url = new URL(`${IMGUR_API_PREFIX}/${GALLERY_ENDPOINT}/${uri}`);
    if (mergedOptions.showViral !== undefined) {
        url.searchParams.append('showViral', mergedOptions.showViral.toString());
    }
    if (mergedOptions.mature !== undefined) {
        url.searchParams.append('mature', mergedOptions.mature.toString());
    }
    if (mergedOptions.album_previews !== undefined) {
        url.searchParams.append('album_previews', mergedOptions.album_previews.toString());
    }
    return url;
}
export function getGallery(client, options = defaultOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        const { pathname } = constructGalleryUrl(options);
        // since we're using prefixUrl with got, we have to remove the starting slash or it'll throw
        const finalPathname = pathname.slice(1);
        return getImgurApiResponseFromResponse(yield client.request({ url: finalPathname }).catch((e) => e.response));
    });
}
