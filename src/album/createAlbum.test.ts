// If this hits the real API I'm not entirely sure how to mock the snapshot since the
// album ID will be dynamic
test.todo('returns a new album response');
// import { ImgurClient } from '../client';
// import { createAlbum } from './createAlbum';

// test('returns a new album response', async () => {
//   const accessToken = 'abc123';
//   const client = new ImgurClient({ accessToken });
//   const response = await createAlbum(client, { title: 'Test Album' });
//   expect(response).toMatchInlineSnapshot(`
//     Object {
//       "data": Object {
//         "description": "Dank memes",
//         "id": "XtMnA",
//         "image_count": 22,
//         "images": Array [
//           Object {
//             "datetime": 1316635799,
//             "description": null,
//             "id": "2dAns",
//             "link": "https://i.imgur.com/2dAns.gif",
//             "title": null,
//             "type": "image/gif",
//           },
//           Object {
//             "datetime": 1316635800,
//             "description": null,
//             "id": "snAd2",
//             "link": "https://i.imgur.com/2dAns.jpg",
//             "title": null,
//             "type": "image/jpeg",
//           },
//         ],
//         "title": "Meme album",
//       },
//       "status": 200,
//       "success": true,
//     }
//   `);
// });
