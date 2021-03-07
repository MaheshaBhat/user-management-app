import { SET_API_STATUS, SET_DATA } from './actionTypes';
import { User } from './types';

export const setApiStatus = (data: number) => ({
  type: SET_API_STATUS,
  payload: data
});

export const setDataList = (data: Array<User>) => ({
  type: SET_DATA,
  payload: data,
});

