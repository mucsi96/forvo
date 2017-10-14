let mocks = {};

function resetMocks() {
  mocks = {};
}

function setMockResponse({ method, url, body, error }) {
  mocks[url][method] = {
    body,
    error
  };
}


