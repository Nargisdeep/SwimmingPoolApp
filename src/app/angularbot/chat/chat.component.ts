import { Component, OnInit } from '@angular/core';
import {Message,ChatService} from '../chat.service'
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  logger:any
  log:any
  role:any
  messages: Message[] = [];
  value: string;
  constructor(public chatService: ChatService) { }
  ngOnInit() {
      this.chatService.conversation.subscribe((val) => {
      this.messages = this.messages.concat(val);
    });
    this.logger=localStorage.getItem('logger')
   this.log=JSON.parse(this.logger)
   console.log(this.logger)  
   console.log(this.log) 
   
   if (this.log.role=="superadmin"){
    this.role="Superadmin"
   }
   else{
    this.role="Admin"
   }

  }
  sendMessage() {
    this.chatService.getBotAnswer(this.value);
    this.value = '';
  }
}

