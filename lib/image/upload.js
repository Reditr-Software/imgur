import { __awaiter } from "tslib";
import { createForm, getImgurApiResponseFromResponse } from '../common/utils';
import { UPLOAD_ENDPOINT, IMAGE_ENDPOINT } from '../common/endpoints';
export function upload(client, payload) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const form = createForm(payload);
        const image = payload.image;
        const filename = typeof image === 'string' ? image : (_a = image.path) !== null && _a !== void 0 ? _a : image.name;
        const isVideo = payload.type === 'stream' &&
            filename &&
            (filename.indexOf('.mp4') !== -1 || filename.indexOf('.avi') !== -1);
        const url = isVideo ? UPLOAD_ENDPOINT : IMAGE_ENDPOINT;
        /* eslint no-async-promise-executor: 0 */
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            return resolve(getImgurApiResponseFromResponse(yield client
                .request({
                url,
                method: 'POST',
                data: form,
                headers: form.getHeaders(),
                onUploadProgress: (progressEvent) => {
                    client.emit('uploadProgress', Object.assign({}, progressEvent));
                },
            })
                .catch((e) => e.response)));
        }));
    });
}
