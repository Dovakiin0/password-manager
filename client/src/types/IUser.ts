export interface ILoginUser {
  username: string;
  password: string;
}

export interface IRegisterUser {
  username: string;
  password: string;
  confirm_password: string;
}

export interface IUser {
  _id: string;
  username: string;
}
