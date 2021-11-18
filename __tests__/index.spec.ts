import { getUserRepositories } from '../src/store';

describe('Is api connect well', () => {
  test('Get portfolio success', async () => {
    const api = await getUserRepositories('/api/data.json');
    const expected = [true, true, true];
    const actual = [];
    const include = ['name', 'description', 'url', 'image'];
    actual[0] = api.portfolio.length > 0;
    actual[1] = Object.keys(api.portfolio[0])?.every(i => include.includes(i));
    actual[2] = Object.keys(api.portfolio[0])?.every(i => api.portfolio[0][i] != undefined && api.portfolio[0][i] != '');

    expect(actual).toEqual(expected);
  });

  test('Get portfolio fail', async () => {
    const expected = null;
    let actual;
    try {
      actual = await getUserRepositories('/api/data1.json');

      if (actual == null) {
        throw new Error();
      }
    }
    catch (error) {
      expect(actual).toEqual(expected);
    }
  });
});
