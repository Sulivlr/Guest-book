export interface Message {
  id: string;
  author: string;
  content: string;
  image: string;
}

export type MessageWithoutId = Omit<Message, 'id'>;