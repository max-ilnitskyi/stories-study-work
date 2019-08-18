const sendJsonExtending = express => {
  // Custom method to send success json
  // Receve object that will merge with response object
  express.response.jsonOk = function(objectToMerge) {
    let objectToSend = { ok: true };

    // If objectToMerge is object merge it to response
    if (typeof objectToMerge === 'object' && objectToMerge !== null) {
      objectToSend = { ...objectToSend, ...objectToMerge };
    } else if (objectToMerge != undefined) {
      // throw error if objectToMerge is specified but not object or undefined/null
      throw new Error(
        'First argument of res.jsonOk must be object that will be merged to response'
      );
    }

    this.status(200).json(objectToSend);
  };

  // Custom method to send reject json
  // Receve string that will be put in message field
  express.response.jsonReject = function functionName(messageToSend, status) {
    let objectToSend = { ok: false };

    // If messageToSend is string put it in message field
    if (typeof messageToSend === 'string') {
      objectToSend.message = messageToSend;
    } else if (messageToSend != undefined) {
      // throw error if messageToSend is specified but not string or undefined/null
      throw new Error(
        'First argument of res.jsonReject must be string that will be put in message field'
      );
    }

    this.status(status || 400).json(objectToSend);
  };
};

module.exports = sendJsonExtending;
