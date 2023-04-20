export enum EForm {
  usersIds = "usersIds",
}

export type TDeleteUserForm = {
  [EForm.usersIds]: string[];
};

export type TDeleteUserModalProps = {
  chatId: number;
};
