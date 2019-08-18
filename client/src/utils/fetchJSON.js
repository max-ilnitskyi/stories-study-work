// When needLogs == true, all requests/responses logged in browser console.
// Logs used in dev by default, just comment it if logs not needed
let needLogs = process.env.NODE_ENV !== 'production';

const createErrorObject = message => ({
  ok: false,
  message: message || 'Unexpected error'
});

// then function for json parsing and logging
const thenParseJson = response => {
  if (needLogs) console.log('---fetchJSON response(original): ', response);

  return response.json();
};

// then function for parsed object logging
const thenLogObject = data => {
  if (needLogs) console.log('---fetchJSON response(parsed): ', data);

  return data;
};

// catch function for error data object creating and logging
const catchErrors = err => {
  if (needLogs) console.log('---!!!fetchJSON error: ', err);

  // create custom error data object
  const localErrorObject = createErrorObject();

  return localErrorObject;
};

// Wrapper for fetch with get method
const get = url => {
  return fetch(url, {
    headers: {
      Accept: 'application/json'
    }
  })
    .then(thenParseJson)
    .then(thenLogObject)
    .catch(catchErrors);
};

// Wrapper for fetch with post method
const post = (url, data) => {
  // Logging sending data
  if (needLogs) console.log('---***fetchJSON send data: ', data);

  let dataJson;

  try {
    dataJson = JSON.stringify(data);
  } catch (err) {
    // Logging parsing error
    if (needLogs) console.log('---***fetchJSON send data parsing error: ', err);

    // return resolved promise with local error object
    return Promise.resolve(createErrorObject());
  }

  return fetch(url, {
    method: 'post',
    body: dataJson,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
    .then(thenParseJson)
    .then(thenLogObject)
    .catch(catchErrors);
};

// Wrapper for fetch with delete method
const deleteData = url => {
  return fetch(url, {
    method: 'delete',
    headers: {
      Accept: 'application/json'
    }
  })
    .then(thenParseJson)
    .then(thenLogObject)
    .catch(catchErrors);
};

// Unite fetch wrappers
const fetchJSON = {
  get,
  post,
  delete: deleteData
};
export default fetchJSON;
