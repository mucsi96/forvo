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

const request = jest.fn(({ url, method }, cb) => {
  const { error, body } = mocks[url] && mocks[url][method];
  cb(error, {}, body);
});

request.__resetMocks = resetMocks;
request.__setMockResponse = setMockResponse;

module.exports = request;

