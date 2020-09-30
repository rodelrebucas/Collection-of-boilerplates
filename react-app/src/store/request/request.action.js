import createAction from "@reduxjs/toolkit";

export const REQUEST_ACTION = "REQUEST";

export const SEARCH_REQUEST_ACTION = "SEARCH_REQUEST";

export const REQUEST_QUEUED_ACTION = "REQUEST_QUEUE";

/** Requets are intercepted by saga,
 *  either create a request that changes
 *  the reducer and dispatched from saga or
 *  just create an action to be intercepted by saga
 */
/** sample action to be intercepted by saga */
export const refreshUserAfterDeleteAction = createAction(
  "REQUEST_REFRESH_USER_AFTER_DELETE",
);

export const uploadImageRequestAction = (
  payload,
  apiMethod,
  uploadRoute,
  reducer,
) => {
  return {
    type: "REQUEST",
    method: apiMethod,
    route: uploadRoute,
    resultReducerAction: reducer, // can be reducer or action reducer
    payload, // TODO: needs testing, if payload is correct.
  };
};

export const searchRequestAction = (apiMethod, apiRoute, reducer) => {
  return {
    type: "SEARCH_REQUEST",
    method: apiMethod,
    route: apiRoute,
    resultReducerAction: reducer,
  };
};
