export interface Message {
  id: Key | null | undefined;
  author: string;
  content: string;
  image: file | null;
}
