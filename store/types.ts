export interface User {
  email: string;
  userName: string;
  id: string;
  contactNo: Number;
  contacts: Array<User>
}

export interface SystemState {
  apiStatus: number;
  userData: Array<User>;
  currentUserName: string;
  currentUserData: Array<User>}

