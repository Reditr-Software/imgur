import { __awaiter } from "tslib";
import { ACCOUNT_ENDPOINT } from '../common/endpoints';
import { getImgurApiResponseFromResponse } from '../common/utils';
export function getAccount(client, account) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${ACCOUNT_ENDPOINT}/${account}`;
        return getImgurApiResponseFromResponse(yield client.plainRequest({ url }).catch((e) => e.response));
    });
}
