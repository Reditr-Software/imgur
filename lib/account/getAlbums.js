import { __awaiter } from "tslib";
import { ACCOUNT_ENDPOINT } from '../common/endpoints';
import { getImgurApiResponseFromResponse } from '../common/utils';
export function getAlbums(client, account, page) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${ACCOUNT_ENDPOINT}/${account}/albums/${page !== null && page !== void 0 ? page : ''}`;
        return getImgurApiResponseFromResponse(yield client.request({ url }).catch((e) => e.response));
    });
}
