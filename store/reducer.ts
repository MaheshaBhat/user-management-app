import statusCodes from './status-codes';
import { ActionTypes, ADD_USER, DELETE_USER, EDIT_USER, SEARCH_USER, SET_API_STATUS, SET_CURRENT_USER, SET_DATA, SORT_DATA } from './actionTypes';
import { SystemState, User } from './types';
import { getData, storeData } from '../constants/helper';


const initialState: SystemState = {
  apiStatus: statusCodes.notUsed,
  userData: [],
  currentUserName: "Mark Henry",
  currentUserID: "AA9C24DA-F722-FC63-A1F8-9B75BB651000",
  currentUserData: [],
  searchData: []
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
      const cData = data.find(v => v.id === state.currentUserID);
      if (!cData) return state;

      return {
        ...state,
        userData: [...data],
        currentUserData: [...cData.contacts],
        searchData: [...cData.contacts]
      };
    }

    case SET_CURRENT_USER: {
      const usr = action.payload;
      const cData = state.userData.find(user => user.userName === usr);
      if (!cData) return state;

      return {
        ...state,
        currentUserName: usr,
        currentUserID: cData.id,
        currentUserData: [...cData.contacts],
        searchData: [...cData.contacts]
      };
    }

    case ADD_USER: {
      const user = action.payload;
      const curData = state.currentUserData.slice(0);
      curData.push({ ...user });


      const usrData = state.userData;
      const ind = usrData.findIndex(el => el.id === state.currentUserID);
      if (ind === -1) return state;
      const tempUserData = usrData[ind];
      tempUserData.contacts = curData;

      return {
        ...state,
        currentUserData: curData,
        searchData: curData,
        userData: [...usrData.slice(0, ind), tempUserData, ...usrData.slice(ind + 1)]
      };
    }

    case EDIT_USER: {
      const user = action.payload;
      let curData = state.currentUserData;
      let ind = curData.findIndex(el => el.id === user.id);
      if (ind === -1) return state;

      curData = [...curData.slice(0, ind), user, ...curData.slice(ind + 1)];

      const usrData = state.userData;
      ind = usrData.findIndex(el => el.id === state.currentUserID);
      if (ind === -1) return state;
      const tempUserData = usrData[ind];
      tempUserData.contacts = curData;

      return {
        ...state,
        currentUserData: [...curData],
        searchData: curData,
        userData: [...usrData.slice(0, ind), tempUserData, ...usrData.slice(ind + 1)]
      };
    }

    case DELETE_USER: {
      const userList = action.payload;
      let curData = state.currentUserData;
      curData = [...curData.filter(usr => !userList.includes(usr.id))];

      const usrData = state.userData;
      const dt = usrData.find(value => (value.userName === state.currentUserName));
      if (!dt) return state;
      dt.contacts = curData;

      return {
        ...state,
        currentUserData: curData,
        searchData: curData,
        userData: [...usrData]
      };
    }

    case SEARCH_USER: {
      const searchText = action.payload;
      let curData = state.searchData;
      curData = curData.filter(usr => (usr.userName.toLowerCase().includes(searchText.toLowerCase()) || usr.email.toLowerCase().includes(searchText.toLowerCase())));

      return {
        ...state,
        currentUserData: curData,
      };
    }

    case SORT_DATA: {
      const sorType = action.payload;
      let compare;
      if (sorType === 'asc') {
        compare = (user1: User, user2: User) => (user1.userName < user2.userName) ? -1 : 1;

      } else if (sorType === 'desc') {
        compare = (user1: User, user2: User) => (user1.userName > user2.userName) ? -1 : 1;
      }
      const curData = state.currentUserData.sort(compare);

      return {
        ...state,
        currentUserData: [...curData],
      };
    }

    default:
      return state;
  }
}
