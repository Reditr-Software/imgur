import { __awaiter } from "tslib";
import { EventEmitter } from 'events';
import { getAuthorizationHeader } from './getAuthorizationHeader';
import { deleteImage, favoriteImage, getImage, upload, updateImage, } from './image';
import { getGallery, getSubredditGallery, searchGallery, } from './gallery';
import { getAlbum } from './album';
import { getAccount, getAlbums, getAlbumsIds } from './account';
import { IMGUR_API_PREFIX } from './common/endpoints';
const USERAGENT = 'imgur (https://github.com/keneucker/imgur)';
import axios from 'axios';
export class ImgurClient extends EventEmitter {
    constructor(credentials) {
        var _a, _b, _c;
        super();
        this.credentials = credentials;
        this.credentials.rapidApiHost = ((_a = credentials.rapidApiKey) === null || _a === void 0 ? void 0 : _a.length)
            ? (_b = credentials.rapidApiHost) !== null && _b !== void 0 ? _b : 'imgur-apiv3.p.rapidapi.com'
            : credentials.rapidApiHost;
        const headers = typeof window !== 'undefined'
            ? {}
            : {
                'user-agent': USERAGENT,
            };
        this.plainFetcher = axios.create({
            baseURL: IMGUR_API_PREFIX,
            headers,
            responseType: 'json',
        });
        this.fetcher = axios.create({
            baseURL: ((_c = credentials.rapidApiKey) === null || _c === void 0 ? void 0 : _c.length)
                ? `https://${this.credentials.rapidApiHost}`
                : IMGUR_API_PREFIX,
            headers,
            responseType: 'json',
        });
        this.fetcher.interceptors.request.use((config) => __awaiter(this, void 0, void 0, function* () {
            var _d;
            config.headers = config.headers ? config.headers : {};
            config.headers.authorization = yield getAuthorizationHeader(this);
            if ((_d = credentials.rapidApiKey) === null || _d === void 0 ? void 0 : _d.length) {
                config.headers['x-rapidapi-host'] = credentials.rapidApiHost;
                config.headers['x-rapidapi-key'] = credentials.rapidApiKey;
            }
            return config;
        }), (e) => Promise.reject(e));
    }
    plainRequest(options) {
        return this.plainFetcher(options);
    }
    request(options = {}) {
        return this.fetcher(options);
    }
    deleteImage(imageHash) {
        return deleteImage(this, imageHash);
    }
    favoriteImage(imageHash) {
        return favoriteImage(this, imageHash);
    }
    getAlbum(albumHash) {
        return getAlbum(this, albumHash);
    }
    getAccount(account) {
        return getAccount(this, account);
    }
    getAlbums(account, page) {
        return getAlbums(this, account, page);
    }
    getAlbumsIds(account, page) {
        return getAlbumsIds(this, account, page);
    }
    getGallery(options) {
        return getGallery(this, options);
    }
    getSubredditGallery(options) {
        return getSubredditGallery(this, options);
    }
    searchGallery(options) {
        return searchGallery(this, options);
    }
    getImage(imageHash) {
        return getImage(this, imageHash);
    }
    updateImage(payload) {
        return updateImage(this, payload);
    }
    upload(payload) {
        return upload(this, payload);
    }
}
