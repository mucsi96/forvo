import rest from '../rest';
import forvoApi from '..';

jest.mock('../rest');

describe('Forvo API', () => {
  afterEach(() => {
    rest.__resetMocks();
  })

  describe('wordPronunciations', () => {
    it('Gets all the pronunciations from a word', async () => {
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

    it('Throws error if options is not an object', async () => {
      expect.assertions(1);
      const forvo = forvoApi({ key: 'test-api-key' });
      try {
        await forvo.wordPronunciations('sadas');
      } catch(err) {
        expect(err.message).toEqual('Parameters should be an object');
      }
    });

    it('Throws error if word is not provided', async () => {
      expect.assertions(1);
      const forvo = forvoApi({ key: 'test-api-key' });
      try {
        await forvo.wordPronunciations({});
      } catch(err) {
        expect(err.message).toEqual('word is a required parameter');
      }
    });
  });

  describe('standardPronunciation', () => {
    it('Gets the standard (top rated) pronunciation from a word', async () => {
      const expectedWordPronunciation = 'apple1';
      rest.__setMockResponse({
        method: 'GET',
        url: 'https://apifree.forvo.com/key/test-api-key/format/json/action/standard-pronunciation/word/apple/other-param/1',
        body: expectedWordPronunciation
      });
      const forvo = forvoApi({ key: 'test-api-key' });
      const actualWordPronunciation = await forvo.standardPronunciation({ word: 'apple', otherParam: 1 });
      expect(actualWordPronunciation).toEqual(expectedWordPronunciation);
    });
  });

  describe('languageList', () => {
    it('Gets languages availables at Forvo', async () => {
      const expectedLanguages = ['en', 'de'];
      rest.__setMockResponse({
        method: 'GET',
        url: 'https://apifree.forvo.com/key/test-api-key/format/json/action/language-list/other-param/1',
        body: expectedLanguages
      });
      const forvo = forvoApi({ key: 'test-api-key' });
      const actualLanguages = await forvo.languageList({ otherParam: 1 });
      expect(actualLanguages).toEqual(expectedLanguages);
    });
  });

  describe('popularLanguages', () => {
    it('Gets the most popular languages', async () => {
      const expectedLanguages = ['en', 'de'];
      rest.__setMockResponse({
        method: 'GET',
        url: 'https://apifree.forvo.com/key/test-api-key/format/json/action/language-popular/other-param/1',
        body: expectedLanguages
      });
      const forvo = forvoApi({ key: 'test-api-key' });
      const actualLanguages = await forvo.popularLanguages({ otherParam: 1 });
      expect(actualLanguages).toEqual(expectedLanguages);
    });
  });

  describe('pronouncedWordsSearch', () => {
    it('Gets words starting with a pattern alphabetically ordered with one or more pronunciations', async () => {
      const expectedWordPronunciations = ['apple1', 'apple2'];
      rest.__setMockResponse({
        method: 'GET',
        url: 'https://apifree.forvo.com/key/test-api-key/format/json/action/pronounced-words-search/search/apple/other-param/1',
        body: expectedWordPronunciations
      });
      const forvo = forvoApi({ key: 'test-api-key' });
      const actualWordPronunciations = await forvo.pronouncedWordsSearch({ search: 'apple', otherParam: 1 });
      expect(actualWordPronunciations).toEqual(expectedWordPronunciations);
    });
  });

  describe('wordsSearch', () => {
    it('Gets words starting with a pattern alphabetically ordered', async () => {
      const expectedWordPronunciations = ['apple1', 'apple2'];
      rest.__setMockResponse({
        method: 'GET',
        url: 'https://apifree.forvo.com/key/test-api-key/format/json/action/words-search/search/apple/other-param/1',
        body: expectedWordPronunciations
      });
      const forvo = forvoApi({ key: 'test-api-key' });
      const actualWordPronunciations = await forvo.wordsSearch({ search: 'apple', otherParam: 1 });
      expect(actualWordPronunciations).toEqual(expectedWordPronunciations);
    });
  });

  describe('popularPronouncedWords', () => {
    it('Gets the most popular words with, at least, one pronunciation', async () => {
      const expectedWordPronunciations = ['apple1', 'apple2'];
      rest.__setMockResponse({
        method: 'GET',
        url: 'https://apifree.forvo.com/key/test-api-key/format/json/action/popular-pronounced-words/other-param/1',
        body: expectedWordPronunciations
      });
      const forvo = forvoApi({ key: 'test-api-key' });
      const actualWordPronunciations = await forvo.popularPronouncedWords({ otherParam: 1 });
      expect(actualWordPronunciations).toEqual(expectedWordPronunciations);
    });
  });
});
