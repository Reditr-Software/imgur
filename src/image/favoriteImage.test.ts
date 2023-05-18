import { ImgurClient } from '../client';
import { favoriteImage } from './favoriteImage';

test('favorite works successfully', async () => {
  const accessToken = 'abc123';
  const client = new ImgurClient({ accessToken });
  const response = await favoriteImage(client, 'CEddrgP');
  expect(response).toMatchInlineSnapshot(`
    Object {
      "data": "favorited",
      "headers": Object {
        "content-type": "application/json",
        "x-powered-by": "msw",
      },
      "status": 200,
      "success": true,
    }
  `);
});
