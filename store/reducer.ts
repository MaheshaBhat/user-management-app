import statusCodes from './status-codes';
import { ActionTypes, SET_API_STATUS, SET_DATA } from './actionTypes';
import { SystemState } from './types';


const initialState: SystemState = {
  apiStatus: statusCodes.notUsed,
  userData: []
};


// product reducer
export function productReducer(state = initialState, action: ActionTypes): SystemState {
  switch (action.type) {
    case SET_API_STATUS: {
      const data = action.payload;
      return {
        ...state,
        apiStatus: data,
      };
    }
    case SET_DATA: {
      const data = action.payload;
      return {
        ...state,
        userData: [...data]
      };
    }

    default:
      return state;
  }
}
