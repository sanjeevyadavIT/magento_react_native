/**
 * Set this to false, to stop API logging
 */
const SHOW_LOG = true;

export default class Logger {
  static describeRequest(request = {}) {
    if (!SHOW_LOG || process.env.NODE_ENV !== 'development') {
      return;
    }
    //------------------------------------------
    console.group('WEBSERVICE: REQUEST');
    console.log(`URI: ${request.url}`);
    console.log(`METHOD: ${request.method}`);
    //------------------------------------------
    if (request.params) {
      console.groupCollapsed('PARAMS');
      console.log(request.params);
      console.groupEnd();
    }
    //--------------------------------------------
    console.groupCollapsed('HEADERS');
    console.table(request.headers);
    console.groupEnd();
    //-------------------------------------------
    if (request.data) {
      console.group('BODY');
      console.log(request.data);
      console.groupEnd();
    }
    //--------------------------------------------
    console.groupEnd();
  }

  static describeSuccessResponse(response) {
    if (!SHOW_LOG || process.env.NODE_ENV !== 'development') {
      return;
    }
    //----------------------------------------------
    console.group('WEBSERVICE: RESPONSE');
    console.log(`URI: ${response.request._url}`);
    console.log(`STATUS: ${response.status}`);
    console.log(`STATUS TEXT: ${response.statusText}`);
    //----------------------------------------------
    console.groupCollapsed('DATA');
    console.log(response.data);
    console.groupEnd();
    //--------------------------------------------------
    console.groupEnd();
  }

  static describeErrorResponse(error) {
    if (!SHOW_LOG || process.env.NODE_ENV !== 'development') {
      return;
    }
    //-----------------------------------------------------
    console.group(
      '%c Error ',
      'color: white; background-color: #D33F49',
      'WEBSERVICE: RESPONSE',
    );
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const request = error.response.request || error.request || {};
      console.log(`URI: ${request._url}`);
      console.log(`STATUS: ${error.response.status}`);
      //--------------------------------------------
      console.groupCollapsed('HEADERS');
      console.table(request.headers);
      console.groupEnd();
      //------------------------------------------------
      console.groupCollapsed('DATA');
      console.log(error.response.data);
      console.groupEnd();
      //------------------------------------------------
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(`URI: ${error.request._url}`);
      //--------------------------------------------
      console.groupCollapsed('REQUEST');
      console.log(error.request);
      console.groupEnd();
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log(`UNKNOWN ERROR: ${error.message}`);
    }
    console.groupCollapsed('CONFIG');
    console.log(error.config);
    console.groupEnd();
    console.groupEnd();
  }
}
