import rest from './rest';

function camelCaseToDash( myStr ) {
  return myStr.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
}

const sendForvoRequest = ({ key, action, requiredParams, optionalParams }) => {
  const url = [
    { name: 'key', value: key },
    { name: 'format', value: 'json' },
    { name: 'action', value: action },
    ...requiredParams,
    ...Object.keys(optionalParams).map(key => ({ name: key, value: optionalParams[key] }))
  ].reduce((url, { name, value }) => {
    return [url, camelCaseToDash(name), value].join('/');
  }, 'https://apifree.forvo.com');
  return rest.GET(url);
};

const forvoApi = ({ key }) => {
  return {
    wordPronunciations: ({ word, ...options}) => sendForvoRequest({
      key,
      action: 'word-pronunciations',
      requiredParams: [{ name: 'word', value: word }],
      optionalParams: options
    })
  }
}

export default forvoApi;
