const moment = require("moment");

responseWrapper = {

  serverError: function () {
    return {
      errors: [
        {
          title: 'unexpected server error',
          status: '500',
          meta: {
            timestamp: +moment()
          }
        }
      ]
    }
  },

  success: function (data) {
    return {
      data: data,
    }
  },

  error: function(error) {
    return {
      error: error
    }
  }
};

module.exports = responseWrapper;
