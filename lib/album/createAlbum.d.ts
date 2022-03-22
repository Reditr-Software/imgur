import { ImgurClient } from '../client';
import { ImgurApiResponse, AlbumPayload, NewAlbumData } from '../common/types';
export declare function createAlbum(client: ImgurClient, payload: AlbumPayload): Promise<ImgurApiResponse<NewAlbumData>>;
