import { __awaiter } from "tslib";
import { IMAGE_ENDPOINT } from '../common/endpoints';
import { getImgurApiResponseFromResponse } from '../common/utils';
export function deleteImage(client, imageHash) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${IMAGE_ENDPOINT}/${imageHash}`;
        return getImgurApiResponseFromResponse(yield client.request({ url, method: 'DELETE' }).catch((e) => e.response));
    });
}
