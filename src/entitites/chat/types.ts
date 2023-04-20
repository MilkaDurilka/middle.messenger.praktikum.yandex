export type TChatData = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message?: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
};

export type TChatState = {
  data?: TChatData[];
  isLoading: boolean;
  error?: string | null;
};

export type TWithChats = {
  chats: TChatState;
  selectedChat?: TChatData;
};

export type TWithSelectedChatId = {
  selectedChatId?: TChatData["id"];
};
