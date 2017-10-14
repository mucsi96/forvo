const request = require('request');
const rest = require('../rest');

jest.mock('request');

describe('REST module', () => {
  afterEach(() => {
    request.__resetMocks();
  });

  ['GET', 'POST', 'DELETE'].forEach(method => {
    describe(`${method} function`, () => {
      test('Calls request wrapped in Promise', () => {
        const url = 'test url';
        const body = { thisIsABody: 'test body' };
        const expectedResponseBody = { thisIsAResponse: 'test response' };
        request.__setMockResponse({ url, method, body: expectedResponseBody });
        return rest[method](url, body).then(actualResponseBody => {
          expect(request).toBeCalledWith({ url, method, body, json: true }, expect.any(Function));
          expect(actualResponseBody).toEqual(expectedResponseBody);
        });
      });

      test('Rejects the Promise on error', () => {
        const url = 'test url';
        const body = { thisIsABody: 'test body' };
        const expectedResponseBody = { thisIsAResponse: 'test response' };
        request.__setMockResponse({ url, method, error: 'test error' });
        return rest[method](url, body).catch(err => {
          expect(err).toEqual('test error');
        });
      });
    });
  });
});
