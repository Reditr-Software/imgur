import { __awaiter } from "tslib";
import { ALBUM_ENDPOINT } from '../common/endpoints';
import { getImgurApiResponseFromResponse } from '../common/utils';
export function getAlbum(client, albumHash) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${ALBUM_ENDPOINT}/${albumHash}`;
        return getImgurApiResponseFromResponse(yield client.request({ url }).catch((e) => e.response));
    });
}
