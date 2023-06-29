import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
export class Message {
  constructor(public author: string, public content: string) {}
}
@Injectable()
export class ChatService {
  constructor() {}
  conversation = new Subject<Message[]>();
  ques:string=""
  messageMap = {
    "Hi": "Hello",
    "Who are you": "My Name is GoSwim Helper",
    "What is your role": "I am here to help you",
    "How to Add a Admin":"Click on the Register Admin Button in Sidebar a Form Will Open Press Submit button you are good to go",
    "How to Add a member":"Click on the Register Member Button in Sidebar a Form Will Appear Fill that.",
    "Can we add only 5 more members after a main member":"Yes",
    "defaultmsg": "I can't understand your text. Can you please repeat"
  }
  getBotAnswer(msg: string) {
    const userMessage = new Message('user', msg);
    this.conversation.next([userMessage]);
    const botMessage = new Message('bot', this.getBotMessage(msg));
    setTimeout(()=>{
      this.conversation.next([botMessage]);
    }, 1000);
  }
  getBotMessage(question: string){
    console.log(this.messageMap)

    let answer = this.messageMap[question as keyof typeof this.messageMap];
    return answer || this.messageMap['defaultmsg'];
  }
}
