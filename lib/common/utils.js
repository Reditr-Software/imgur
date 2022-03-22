import FormData from 'form-data';
export function createForm(payload) {
    const form = new FormData();
    if (typeof payload === 'string') {
        form.append('image', payload);
        return form;
    }
    for (const [key, value] of Object.entries(payload)) {
        const supportedUploadObjectTypes = ['base64', 'stream'];
        if (supportedUploadObjectTypes.indexOf(key) !== -1) {
            if (supportedUploadObjectTypes.indexOf(payload.type) !== -1) {
                form.append(key, payload);
            }
        }
        else {
            form.append(key, value);
        }
    }
    form.getHeaders = form.getHeaders
        ? form.getHeaders
        : () => {
            return {
                'Content-Type': 'multipart/form-data',
            };
        };
    return form;
}
export function getImgurApiResponseFromResponse(response) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    let success = true;
    let data;
    let status = 200;
    const responseIsValid = response &&
        (typeof response.status !== 'undefined' ||
            typeof ((_a = response.data) === null || _a === void 0 ? void 0 : _a.status) !== 'undefined') &&
        typeof response.data !== 'undefined';
    const responseIsSuccess = responseIsValid && !!response.data.success;
    const responseIsError = responseIsValid &&
        !responseIsSuccess &&
        (typeof ((_b = response.data.data) === null || _b === void 0 ? void 0 : _b.error) !== 'undefined' ||
            typeof response.data.errors !== 'undefined');
    const getResponseData = (d) => Array.isArray(d) ? d.map((t) => (responseIsError ? t.detail : t.data)) : d;
    if (typeof response === 'undefined') {
        data = 'response was empty';
        status = 500;
        success = false;
    }
    else if (typeof response === 'string') {
        data = response;
        status = 500;
        success = false;
    }
    else if (responseIsSuccess) {
        status = response.data.status;
        data = response.data.data.error
            ? response.data.data.error
            : response.data.data;
    }
    else {
        success = false;
        status =
            (_f = (_e = (_d = (_c = response.data.data) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.code) !== null && _e !== void 0 ? _e : response.status) !== null && _f !== void 0 ? _f : response.data.status;
        data = getResponseData(responseIsError
            ? (_h = (_g = response.data.errors) !== null && _g !== void 0 ? _g : response.data.data.error.message) !== null && _h !== void 0 ? _h : response.data.data.error
            : (_k = (_j = response.data.data) !== null && _j !== void 0 ? _j : response.data.message) !== null && _k !== void 0 ? _k : response.data);
    }
    return {
        data,
        status,
        success,
    };
}
