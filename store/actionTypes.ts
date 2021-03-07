import { User } from "./types";

export const SET_API_STATUS = 'setApiStatus';
export const SET_DATA = 'setData';
export const SET_CURRENT_USER = 'setCurrentUserInfo';
export const ADD_USER = 'addUser';
export const EDIT_USER = 'editUser';
export const DELETE_USER = 'deleteUser';
export const SEARCH_USER = 'searchUser';
export const SORT_DATA = "sortData";

interface setApiStatusAction {
    type: typeof SET_API_STATUS,
    payload: number
}

interface setDataListAction {
    type: typeof SET_DATA,
    payload: Array<User>,
}

interface setCurrentUserInfo {
    type: typeof SET_CURRENT_USER,
    payload: string,
}

interface addUser {
    type: typeof ADD_USER,
    payload: User,
}

interface editUser {
    type: typeof EDIT_USER,
    payload: User,
}

interface deleteUser {
    type: typeof DELETE_USER,
    payload: Array<string>,
}

interface searchUser {
    type: typeof SEARCH_USER,
    payload: string,
}

interface sortUser {
    type: typeof SORT_DATA,
    payload: string,
}




export type ActionTypes = setApiStatusAction | setDataListAction | setCurrentUserInfo | addUser | editUser | deleteUser | searchUser | sortUser;
