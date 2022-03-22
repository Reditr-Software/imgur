import { __awaiter } from "tslib";
import { isAccessToken, isRefreshToken, isClientId, } from './common/types';
import { IMGUR_API_PREFIX, TOKEN_ENDPOINT } from './common/endpoints';
export function getAuthorizationHeader(client) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isAccessToken(client.credentials)) {
            return `Bearer ${client.credentials.accessToken}`;
        }
        const { clientId, clientSecret, refreshToken } = client.credentials;
        if (isRefreshToken(client.credentials)) {
            const options = {
                url: TOKEN_ENDPOINT,
                baseURL: IMGUR_API_PREFIX,
                method: 'POST',
                data: {
                    client_id: clientId,
                    client_secret: clientSecret,
                    refresh_token: refreshToken,
                    grant_type: 'refresh_token',
                },
            };
            const response = yield client.plainRequest(options);
            if (response.status === 200 && response.data) {
                const { access_token: accessToken, refresh_token: refreshToken } = response.data;
                client.credentials.accessToken = accessToken;
                client.credentials.refreshToken = refreshToken;
                return `Bearer ${accessToken}`;
            }
        }
        if (isClientId(client.credentials)) {
            return `Client-ID ${clientId}`;
        }
        return null;
    });
}
