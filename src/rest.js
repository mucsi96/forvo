import request from 'request';

function sendRequest(method, url, body) {
  return new Promise((resolve, reject) => {
      request({
          url,
          method,
          json: true,
          body
      }, (err, response, responseBody) => {
          if (err) {
              reject(err);
              return;
          }

          resolve(responseBody);
      });
  });
}

export default {
  GET: (url, body) => sendRequest('GET', url, body),
  POST: (url, body) => sendRequest('POST', url, body),
  DELETE: (url, body) => sendRequest('DELETE', url, body)
};
