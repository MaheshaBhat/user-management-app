import { User } from "./types";

export const SET_API_STATUS = 'setApiStatus';
export const SET_DATA = 'setData';
export const CLEAR_FILTER = 'clearFilter';

interface setApiStatusAction {
    type: typeof SET_API_STATUS,
    payload: number
}

interface setDataListAction {
    type: typeof SET_DATA,
    payload: Array<User>,
}


export type ActionTypes = setApiStatusAction | setDataListAction;
