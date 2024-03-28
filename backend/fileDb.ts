import { promises as fs } from 'fs';
import crypto from 'crypto';
import {MessageWithoutId, Message} from './types';



const filename = './db.json';
let data: Message[] = [];

const fileDb = {
  async init() {
    try {
      const fileContents = await fs.readFile(filename);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      data = [];
    }
  },

  async getMessages(): Promise<Message[]> {
    return data;
  },

  async addMessage(message: MessageWithoutId): Promise<Message> {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      author: message.author || "Anonymous",
      content: message.content,
      image: message.image
    };

    data.push(newMessage);
    await this.save();
    return newMessage;
  },

  async save() {
    await fs.writeFile(filename, JSON.stringify(data, null, 2));
  }
};

export default fileDb;
