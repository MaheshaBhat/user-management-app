import { ADD_USER, DELETE_USER, EDIT_USER, SEARCH_USER, SET_API_STATUS, SET_CURRENT_USER, SET_DATA, SORT_DATA } from './actionTypes';
import { User } from './types';

export const setApiStatus = (data: number) => ({
  type: SET_API_STATUS,
  payload: data
});

export const setDataList = (data: Array<User>) => ({
  type: SET_DATA,
  payload: data,
});


export const setCurrentUser = (usr: string) => ({
  type: SET_CURRENT_USER,
  payload: usr,
});

export const addUser = (user: User) => ({
  type: ADD_USER,
  payload: user,
});

export const editUser = (user: User) => ({
  type: EDIT_USER,
  payload: user,
});

export const deleteUser = (users: Array<string>) => ({
  type: DELETE_USER,
  payload: users,
});

export const searchUser = (searchText: string) => ({
  type: SEARCH_USER,
  payload: searchText,
});

export const sortUser = (sortType: string) => ({
  type: SORT_DATA,
  payload: sortType,
});


