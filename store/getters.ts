import { SystemState } from './types';

export const getUser = (state: SystemState) => state.userData;
export const getApiStatus = (state: SystemState) => state.apiStatus;


