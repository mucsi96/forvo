import rest from './rest';

const checkParameters = (requiredParams, params) => {
  if (typeof params !== 'object') {
    throw new Error('Parameters should be an object');
  }
  requiredParams.forEach(requiredParam => {
    if (!params || !params[requiredParam]) {
      throw new Error(`${requiredParam} is a required parameter`);
    }
  })
}

function camelCaseToDash( myStr ) {
  return myStr.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
}

function makeURLCompatible(value) {
  if (typeof value === 'string') {
    return value.replace(/ /g, '_').toLowerCase();
  }

  return value.toString();
}

const sendForvoRequest = ({ key, action, requiredParams, params = {} }) => {
  checkParameters(requiredParams, params);
  const optionalParams = Object.keys(params).filter(name => !requiredParams.includes(name));
  const url = [
    { name: 'key', value: key },
    { name: 'format', value: 'json' },
    { name: 'action', value: action },
    ...requiredParams.map(name => ({ name, value: params[name] })),
    ...optionalParams.map(name => ({ name, value: params[name] }))
  ].reduce((url, { name, value }) => {
    return [url, camelCaseToDash(name), makeURLCompatible(value)].join('/');
  }, 'https://apifree.forvo.com');
  return rest.GET(url);
};

/**
 * This function creates Forgo api.
 * @param {object} options - Configuration object for Forgo api
 * @param {string} options.key - Your Forgo api key
 * @returns {API} Api
 * @example
 * import forgoApi from 'forgo';
 *
 * const forgo = forgoApi({ key: 'your api key' });
 */
const forvoApi = ({ key }) => {
  /**
   * This object represents a Forgo Api.
   * @typedef {Object} Api
   * @property {Api.wordPronunciations} wordPronunciations - This function gets all the pronunciations from a word.
   * @property {Api.standardPronunciation} standardPronunciation - This function gets the standard (top rated) pronunciation from a word.
   * @property {Api.languageList} languageList - This function gets languages availables at Forvo.
   * @property {Api.popularLanguages} popularLanguages - This function gets the most popular languages.
   * @property {Api.pronouncedWordsSearch} pronouncedWordsSearch - This function gets words starting with a pattern alphabetically ordered with one or more pronunciations.
   * @property {Api.wordsSearch} wordsSearch - This function gets words starting with a pattern alphabetically ordered.
   * @property {Api.popularPronouncedWords} popularPronouncedWords - This function gets the most popular words with, at least, one pronunciation..
   */
  return {
    /**
     * This function gets all the pronunciations from a word.
     * @name Api.wordPronunciations
     * @function
     * @param {object} parameters - Parameters object provided for Forgo api
     * @param {string} parameters.word - The word you want to get its pronunciations.
     * @param {string} [parameters.language] - To get only the pronunciations recorded in the given language.
     * @param {string} [parameters.country] - To get only the pronunciations recorded by users of this country. You should use the Alpha-3 code.
     * @param {string} [parameters.username] - Returns the pronunciation recorded by a specific user.
     * @param {string} [parameters.sex] - m (for male), f (for female)
     * @param {number} [parameters.rate] - To get only the pronunciations rated with at least the given value.
     * @param {string} [parameters.order] - date-desc (pronunciations order by pronounced time, from recent to older)
        date-asc (pronunciations order by pronounced time, older to recent)
        rate-desc (pronunciations order by rate, high rated first)
        rate-asc (pronunciations order by rate, low rated first)
     * @param {number} [parameters.limit] - Max. pronunciations returned.
     * @param {boolean} [parameters.groupInLanguages] - Group pronunciations in languages. Default value is false.
     * @returns {Promise<Object>} - All the pronunciations from a word
     * @see {@link https://api.forvo.com/documentation/word-pronunciations|Forgo API documentation}
     * @example
     * import forgoApi from 'forgo';
     *
     * const forgo = forgoApi({ key: 'your api key' });
     * const start = async () => {
     *   const wordPronunciations = await forgo.wordPronunciations({ word: 'Apfel', language: 'de' })
     *   // {
     *   //   attributes: { total: 11 },
     *   //   items:[
     *   //     { id: 5943, word: 'apfel', original: 'Apfel', pathmp3: 'https://apifree.forvo.com/audio/3h3h...
     *   //   ]
     *   // }
     * }
     *
     * start().catch(err => console.log(err.stack));
     */
    wordPronunciations: params => sendForvoRequest({
      key,
      action: 'word-pronunciations',
      requiredParams: ['word'],
      params
    }),
    /**
     * This function gets the standard (top rated) pronunciation from a word.
     * @name Api.standardPronunciation
     * @function
     * @param {object} parameters - Parameters object provided for Forgo api
     * @param {string} parameters.word - The word you want to get its pronunciations.
     * @param {string} [parameters.language] - To get only the pronunciations recorded in the given language.
     * @returns {Promise<Object>} - Standard (top rated) pronunciation from a word
     * @see {@link https://api.forvo.com/documentation/standard-pronunciation|Forgo API documentation}
     * @example
     * import forgoApi from 'forgo';
     *
     * const forgo = forgoApi({ key: 'your api key' });
     * const start = async () => {
     *   const wordPronunciations = await forgo.standardPronunciation({ word: 'auf Wiederschauen', language: 'de' })
     *   // {
     *   //   items:[
     *   //     { id: 5943, word: 'auf_wiederschauen', original: 'auf Wiederschauen', pathmp3: 'https://apifree.forvo.com/audio/3h3h...
     *   //   ]
     *   // }
     * }
     *
     * start().catch(err => console.log(err.stack));
     */
    standardPronunciation: params => sendForvoRequest({
      key,
      action: 'standard-pronunciation',
      requiredParams: ['word'],
      params
    }),
    /**
     * This function gets languages availables at Forvo.
     * @name Api.languageList
     * @function
     * @param {object} parameters - Parameters object provided for Forgo api
     * @param {string} [parameters.language] - Language code or "native" to get the language list with the names of the languages in their native languages. Default is English (en).
     * @param {string} [parameters.order] - Values: "name" or "code". Default is name.
     * @param {number} [parameters.minPronunciations] - Values: any integer number. To get only the languagues with, at least, the given number of pronunciations.
     * @returns {Promise<Object>} - Languages availables at Forvo.
     * @see {@link https://api.forvo.com/documentation/language-list|Forgo API documentation}
     * @example
     * import forgoApi from 'forgo';
     *
     * const forgo = forgoApi({ key: 'your api key' });
     * const start = async () => {
     *   const wordPronunciations = await forgo.languageList()
     *   // {
     *   //   attributes: { total: 349 },
     *   //   items:[
     *   //     { code: 'abq', en: 'Abaza' },
     *   //     { code: 'ab', en: 'Abkhazian' },
     *   //     ...
     *   //   ]
     *   // }
     * }
     *
     * start().catch(err => console.log(err.stack));
     */
    languageList: params => sendForvoRequest({
      key,
      action: 'language-list',
      requiredParams: [],
      params
    }),
    /**
     * This function gets the most popular languages.
     * @name Api.popularLanguages
     * @function
     * @param {object} parameters - Parameters object provided for Forgo api
     * @param {string} [parameters.language] - Values: Language code or "native" to get the language list with the names of the languages in their native languages. Default is English (en).
     * @param {string} [parameters.order] - Values: "popular", "name" or "code". Default is "popular".
     * @param {string} [parameters.limit] - Values: any integer number. Max. languages returned. Default is 10.
     * @returns {Promise<Object>} - The most popular languages
     * @see {@link https://api.forvo.com/documentation/language-popular|Forgo API documentation}
     * @example
     * import forgoApi from 'forgo';
     *
     * const forgo = forgoApi({ key: 'your api key' });
     * const start = async () => {
     *   const wordPronunciations = await forgo.popularLanguages()
     *   // {
     *   //   attributes: { total: 10 },
     *   //   items:[
     *   //     { code: 'de', en: 'German' },
     *   //     { code: 'tt', en: 'Tatar' },
     *   //     ...
     *   //   ]
     *   // }
     * }
     *
     * start().catch(err => console.log(err.stack));
     */
    popularLanguages: params => sendForvoRequest({
      key,
      action: 'language-popular',
      requiredParams: [],
      params
    }),
    /**
     * This function gets words starting with a pattern alphabetically ordered with one or more pronunciations.
     * @name Api.pronouncedWordsSearch
     * @function
     * @param {object} parameters - Parameters object provided for Forgo api
     * @param {string} parameters.search - The pattern you want to search.
     * @param {string} [parameters.language] - To get only the pronunciations recorded in the given language.
     * @param {number} [parameters.pagesize] - Values: any integer number between 1-100. Set the page size in results. Default is 20.
     * @param {number} [parameters.page] - Values: any integer number. Set the page results you want to retrieve. Default is 1.
     * @returns {Promise<Object>} - Words starting with a pattern alphabetically ordered with one or more pronunciations
     * @see {@link https://api.forvo.com/documentation/pronounced-words-search|Forgo API documentation}
     * @example
     * import forgoApi from 'forgo';
     *
     * const forgo = forgoApi({ key: 'your api key' });
     * const start = async () => {
     *   const wordPronunciations = await forgo.pronouncedWordsSearch({ search: 'aus', language: 'de' })
     *   // {
     *   //   attributes: attributes: { page: 1, pagesize: 20, total_pages: 7, total: 121 },
     *   //   items:[
     *   //     { id: 20945, word: 'aus', original: 'aus', num_pronunciations: '4', standard_pronunciation: ... },
     *   //     { id: 20945, word: 'aus_dem_weg_gehen', original: 'aus dem Weg gehen', num_pronunciations ... }
     *   //     ...
     *   //   ]
     *   // }
     * }
     *
     * start().catch(err => console.log(err.stack));
     */
    pronouncedWordsSearch: params => sendForvoRequest({
      key,
      action: 'pronounced-words-search',
      requiredParams: ['search'],
      params
    }),
    /**
     * This function gets words starting with a pattern alphabetically ordered.
     * @name Api.wordsSearch
     * @function
     * @param {object} parameters - Parameters object provided for Forgo api
     * @param {string} parameters.search - The pattern you want to search.
     * @param {string} [parameters.language] - To get only the pronunciations recorded in the given language.
     * @param {number} [parameters.pagesize] - Values: any integer number between 1-100. Set the page size in results. Default is 20.
     * @param {number} [parameters.page] - Values: any integer number. Set the page results you want to retrieve. Default is 1.
     * @returns {Promise<Object>} - Words starting with a pattern alphabetically ordered
     * @see {@link https://api.forvo.com/documentation/words-search|Forgo API documentation}
     * @example
     * import forgoApi from 'forgo';
     *
     * const forgo = forgoApi({ key: 'your api key' });
     * const start = async () => {
     *   const wordPronunciations = await forgo.wordsSearch({ search: 'aus', language: 'de' })
     *   // {
     *   //   attributes: attributes: { page: 1, pagesize: 20, total_pages: 7, total: 121 },
     *   //   items:[
     *   //     { id: 20945, word: 'aus', original: 'aus', num_pronunciations: '4', standard_pronunciation: ... },
     *   //     { id: 20945, word: 'aus_dem_weg_gehen', original: 'aus dem Weg gehen', num_pronunciations ... }
     *   //     ...
     *   //   ]
     *   // }
     * }
     *
     * start().catch(err => console.log(err.stack));
     */
    wordsSearch: params => sendForvoRequest({
      key,
      action: 'words-search',
      requiredParams: ['search'],
      params
    }),
    /**
     * This function gets the most popular words with, at least, one pronunciation.
     * @name Api.popularPronouncedWords
     * @function
     * @param {object} parameters - Parameters object provided for Forgo api
     * @param {string} [parameters.language] - To get only the words in the given language.
     * @param {number} [parameters.limit] - Values: any integer number. Max. word returned. Default is 1000.
     * @returns {Promise<Object>} - The most popular words with, at least, one pronunciation.
     * @see {@link https://api.forvo.com/documentation/popular-pronounced-words|Forgo API documentation}
     * @example
     * import forgoApi from 'forgo';
     *
     * const forgo = forgoApi({ key: 'your api key' });
     * const start = async () => {
     *   const wordPronunciations = await forgo.popularPronouncedWords({ language: 'de' })
     *   // {
     *   //   attributes: { total: 993 },
     *   //   items:[
     *   //     { id: 5619, word: 'adidas', original: 'Adidas', num_pronunciations: '4' },
     *   //     { id: 3697234, word: 'airbagbereich', original: 'Airbagbereich', num_pronunciations: '3' }
     *   //     ...
     *   //   ]
     *   // }
     * }
     *
     * start().catch(err => console.log(err.stack));
     */
    popularPronouncedWords: params => sendForvoRequest({
      key,
      action: 'popular-pronounced-words',
      requiredParams: [],
      params
    }),
  }
}

export default forvoApi;
