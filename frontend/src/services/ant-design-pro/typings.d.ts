// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    id:number;
    username: string;
    userAccount : string;
    avatarUrl?: string;
    gender?: number;
    userPassword?: string;
    phone?: string;
    email?: string;
    userStatus?: number;
    createTime?: Date;
    updateTime?: Date;
    isDelete?: number;
    userRole?: number;
    planetCode?: number;
  };

  type BaseResponse<T> = {
    code: number;
    data: T;
    message: string;
    description: string;
  };

  type LoginResult = BaseResponse<CurrentUser>;

  type RegisterResult = BaseResponse<number>;

  type UserResult = BaseResponse<CurrentUser>;

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type LoginParams = {
    userAccount?: string;
    userPassword?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type RegisterParams = {
    userAccount?: string;
    userPassword?: string;
    confirmPassword?: string;
    planetCode?: string;
    type?: string;
  };
}
