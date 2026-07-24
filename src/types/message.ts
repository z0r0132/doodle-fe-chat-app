export type Message = {
  _id: string;
  message: string;
  author: string;
  createdAt: string;
};

export type CreateMessageInput = {
  message: string;
  author: string;
};

export type GetMessagesParams = {
  limit?: number;
  after?: string;
  before?: string;
};
