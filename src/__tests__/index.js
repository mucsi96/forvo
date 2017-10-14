import rest from '../rest';
import forvoApi from '..';

jest.mock('../rest');

describe('Forvo API', () => {
  describe('wordPronunciations', () => {
    it('Returns word pronunciations', async () => {
      const expectedWordPronunciations = ['apple1', 'apple2'];
      rest.__setMockResponse({
        method: 'GET',
        url: 'https://apifree.forvo.com/key/test-api-key/format/json/action/word-pronunciations/word/apple/other-param/1',
        body: expectedWordPronunciations
      });
      const forvo = forvoApi({ key: 'test-api-key' });
      const actualWordPronunciations = await forvo.wordPronunciations({ word: 'apple', otherParam: 1 });
      expect(actualWordPronunciations).toEqual(expectedWordPronunciations);
    });
  });
});
