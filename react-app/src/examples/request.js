
import createAction from '@reduxjs/toolkit';
import ApiService from '../service/api/Api.service';
import { updateReducerAction } from '../store/root.reducer';

/**
 *  Sample dispatching requests
 *   @param payload: Object
 *  addRequestAction(payload)
 */
/** -- Sample action that changes the reducer */
export const addRequestAction = payload => ({
    type: 'REQUEST',
    method: ApiService.getApi().post,
    route: '/post/route',
    resultReducerAction: updateReducerAction,
    payload,
});

/** Requests are intercepted by saga,
 *  either create a request that changes
 *  the reducer and dispatched from saga or
 *  just create an action to be intercepted by saga
 */
/** sample action to be intercepted by saga */
export const refreshUserAfterDeleteAction = createAction(
    'REQUEST_REFRESH_USER_AFTER_DELETE',
);