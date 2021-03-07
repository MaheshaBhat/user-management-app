import { SystemState } from './types';

export const getUser = (state: SystemState) => state.userData;
export const getApiStatus = (state: SystemState) => state.apiStatus;
export const getCurrentUserData = (state: SystemState) => state.currentUserData;
export const getCurrentUserName = (state: SystemState) => state.currentUserName;
