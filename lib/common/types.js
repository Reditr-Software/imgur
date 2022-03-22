export function isAccessToken(arg) {
    return arg.accessToken !== undefined;
}
export function isRefreshToken(arg) {
    return arg.refreshToken !== undefined;
}
export function isClientId(arg) {
    return arg.clientId !== undefined;
}
