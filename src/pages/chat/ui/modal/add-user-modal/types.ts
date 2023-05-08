export enum EForm {
  usersIds = "usersIds",
}

export type TAddUserForm = {
  [EForm.usersIds]: string;
};

export type TAddUserModalProps = {
  chatId: number;
};
