export interface User {
  email: string;
  userName: string;
  id: string;
  contactNo: string;
  contacts: Array<User>
}

export interface SystemState {
  apiStatus: number;
  userData: Array<User>;
  currentUserName: string;
  currentUserID: string;
  currentUserData: Array<User>
  searchData: Array<User>
}

