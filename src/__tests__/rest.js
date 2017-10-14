import request from 'request';
import rest from '../rest';

jest.mock('request');

describe('REST module', () => {
  afterEach(() => {
    request.__resetMocks();
  });

  ['GET', 'POST', 'DELETE'].forEach(method => {
    describe(`${method} function`, () => {
      test('Calls request wrapped in Promise', async () => {
        const url = 'test url';
        const body = { thisIsABody: 'test body' };
        const expectedResponseBody = { thisIsAResponse: 'test response' };
        request.__setMockResponse({ url, method, body: expectedResponseBody });
        const actualResponseBody = await rest[method](url, body);
        expect(request).toBeCalledWith({ url, method, body, json: true }, expect.any(Function));
        expect(actualResponseBody).toEqual(expectedResponseBody);
      });

      test('Rejects the Promise on error', async () => {
        const url = 'test url';
        const body = { thisIsABody: 'test body' };
        const expectedResponseBody = { thisIsAResponse: 'test response' };
        request.__setMockResponse({ url, method, error: 'test error' });
        expect.assertions(1);
        try {
          await rest[method](url, body);
        } catch (err) {
          expect(err).toEqual('test error');
        }
      });
    });
  });
});
