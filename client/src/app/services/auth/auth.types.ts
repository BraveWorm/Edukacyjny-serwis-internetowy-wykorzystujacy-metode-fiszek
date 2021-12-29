export interface ILoginUserInfo {
    email: string,
    password: string,
}
export interface IRegistrationUserInfo {
  email: string;
  password: string;
}
export interface ILoginUserResponse{
  accessToken: string;
}
