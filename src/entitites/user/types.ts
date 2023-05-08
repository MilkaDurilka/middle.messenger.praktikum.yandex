export type TUserData = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export type TUpdateProfileData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type TUpdateAvatarData = {
  avatar: string;
};

export type TChangePasswordData = {
  oldPassword: string;
  newPassword: string;
};

export type TUserState = {
  data?: TUserData;
  isLoading: boolean;
  error?: string;
};

export type TWithUser = {
  user: TUserState;
};
