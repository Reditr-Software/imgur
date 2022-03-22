import { ImgurClient } from '../client';
import { ALBUM_ENDPOINT } from '../common/endpoints';
import { ImgurApiResponse, AlbumPayload, NewAlbumData } from '../common/types';
import { getImgurApiResponseFromResponse, createForm } from '../common/utils';

export async function createAlbum(
  client: ImgurClient,
  payload: AlbumPayload
): Promise<ImgurApiResponse<NewAlbumData>> {
  const url = `${ALBUM_ENDPOINT}`;
  return getImgurApiResponseFromResponse(
    await client.request({ url, method: 'POST', data: createForm(payload) }).catch((e) => e.response)
  ) as ImgurApiResponse<NewAlbumData>;
}
