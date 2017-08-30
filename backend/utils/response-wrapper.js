const moment = require("moment");

// TODO: use JSON instead



/**
 * Wrap the text message to the response object
 * @param body: (string|object), response body
 * @param success: boolean, if the request was processed successfully
 * @param serverError: boolean, if the unexpected server error occurred
 * @returns {{body: string|object, success: boolean}}
 */
function responseWrapper (body, success, serverError = false) {
  body = serverError ? `unexpected server error at ${+moment()}` : body;
  return {
    body: body,
    success: success,
  }
}

module.exports = responseWrapper;
