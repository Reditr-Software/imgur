import { __awaiter } from "tslib";
import { IMAGE_ENDPOINT } from '../common/endpoints';
import { createForm, getImgurApiResponseFromResponse } from '../common/utils';
function isValidUpdatePayload(p) {
    return typeof p.title === 'string' || typeof p.description === 'string';
}
export function updateImage(client, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!isValidUpdatePayload(payload)) {
            throw new Error('Update requires a title and/or description');
        }
        const url = `${IMAGE_ENDPOINT}/${payload.imageHash}`;
        const form = createForm(payload);
        /* eslint no-async-promise-executor: 0 */
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            return resolve(getImgurApiResponseFromResponse(yield client
                .request({
                url,
                method: 'POST',
                data: form,
                headers: form.getHeaders(),
            })
                .catch((e) => e.response)));
        }));
    });
}
