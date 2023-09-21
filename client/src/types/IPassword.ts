export interface IPassword {
  _id: string;
  websiteUri: string;
  username: string;
  password: string;
}

export type IPasswordRequest = Omit<IPassword, "_id">;
