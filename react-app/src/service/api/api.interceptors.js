/* eslint-disable max-classes-per-file */
// TODO: remove console.log(error, response)
import {
  NETWORK_ERROR_MSG,
  REQUEST_TIMEOUT_MSG,
  ERROR_WITH_STATUS,
  SOMETHING_WENT_WRONG_MSG,
} from './api.constants';

const transformResponse = response => {
  // We want the api to response with these keys
  // otherwise throw an error
  const { status, message, data } = response;
  if (response.hasOwnProperty("status") && response.hasOwnProperty("message") && response.hasOwnProperty("data"))
    return {
      httpStatusCode: status,
      message,
      data,
    };
  else if (process.env.NODE_ENV === "development")
    throw (new Error("Response is not an object!"))
  else throw (new Error(SOMETHING_WENT_WRONG_MSG))
};

class ResponseError extends Error {
  response;

  name;

  fullErrorStack;

  constructor(result, error) {
    super(result.message);
    this.fullErrorStack = error;
    this.name = 'ResponseError';
    const { data, message, status } = result;
    const response = {
      data,
      message: message || SOMETHING_WENT_WRONG_MSG,
      status,
    };
    this.response = transformResponse(response);
  }
}

class ResponseSuccess {
  response;

  constructor(response) {
    this.response = transformResponse(response);
  }
}

export const successResponseInterceptor = response => {
  console.log({ response });
  const result = response.data;
  return new ResponseSuccess(result);
};

export const errorResponseInterceptor = error => {
  console.log({ error });
  let response;
  if (error.response) {
    // transform all non 2xx errors
    const responseObj = error.response.data;
    if (responseObj && responseObj instanceof Object)
      response = { ...responseObj };
    else
      response = {
        data: null,
        message: `${ERROR_WITH_STATUS}: ${error.response.status}`,
        status: null,
      };
  } else if (error.request) {
    // The request was made but no response was received
    if (error.request._timedOut)
      response = { data: null, message: REQUEST_TIMEOUT_MSG, status: null };
    else
      response = { data: null, message: error.request._response, status: null };
  } else {
    // catch errors before a response
    response = {
      data: null,
      message: error.message || NETWORK_ERROR_MSG,
      status: null,
    };
  }
  return Promise.reject(new ResponseError(response, error));
};
