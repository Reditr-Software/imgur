import { __awaiter } from "tslib";
import { SUBREDDIT_GALLERY_ENDPOINT, IMGUR_API_PREFIX, } from '../common/endpoints';
import { URL } from 'url';
import { getImgurApiResponseFromResponse } from '../common/utils';
export function constructSubredditGalleryUrl(options) {
    let uri = `${options.subreddit}`;
    if (options.sort) {
        uri += `/${options.sort}`;
    }
    if (options.sort === 'top' && options.window) {
        uri += `/${options.window}`;
    }
    if (options.page) {
        uri += `/${options.page}`;
    }
    const url = new URL(`${IMGUR_API_PREFIX}/${SUBREDDIT_GALLERY_ENDPOINT}/${uri}`);
    return url;
}
export function getSubredditGallery(client, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { pathname } = constructSubredditGalleryUrl(options);
        // since we're using prefixUrl with got, we have to remove the starting slash or it'll throw
        const finalPathname = pathname.slice(1);
        return getImgurApiResponseFromResponse(yield client.request({ url: finalPathname }).catch((e) => e.response));
    });
}
