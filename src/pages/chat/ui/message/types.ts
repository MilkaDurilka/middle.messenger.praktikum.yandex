export type TMessageProps = {
  isMine: boolean;
  text: string;
  date: Date;
};

export type TMessageBlock = Omit<TMessageProps, "date"> & {
  time: string;
};
