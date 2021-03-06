export interface User {
  email: string;
  userName: string;
  id: string;
  contactNo: Number;
}

export interface ContactUser {
  [email: string]: Array<User>[];

}
export interface SystemState {
  apiStatus: number;
  userData: Array<ContactUser>[];

}

