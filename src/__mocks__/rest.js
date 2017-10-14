let mocks = {};

function resetMocks() {
  mocks = {};
}

function setMockResponse({ method, url, body, error }) {
  mocks[url] = mocks[url] || {};
  mocks[url][method] = {
    body,
    error
  };
}

function sendRequest(method, url, body) {
  return new Promise((resolve, reject) => {
    const { error, body } = mocks[url] && mocks[url][method] || {};
    if (error) {
      reject(error);
      return;
    }
    resolve(body);
  });
}

export default {
  __resetMocks: resetMocks,
  __setMockResponse: setMockResponse,
  GET: jest.fn((url, body) => sendRequest('GET', url, body)),
  POST: jest.fn((url, body) => sendRequest('POST', url, body)),
  DELETE: jest.fn((url, body) => sendRequest('DELETE', url, body))
};
