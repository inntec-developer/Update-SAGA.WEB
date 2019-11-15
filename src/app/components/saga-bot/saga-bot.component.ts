import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { BotService, Message } from '../../service/Bot/bot.service';
import { scan } from 'rxjs/operators';
@Component({
  selector: 'app-saga-bot',
  templateUrl: './saga-bot.component.html',
  styleUrls: ['./saga-bot.component.scss']
})
export class SagaBotComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter();
  messages: Observable<Message[]>;

  formValue: string;
    // scroll
    disabled = false;
    compact = false;
    invertX = false;
    invertY = false;
    shown = 'hover';
  constructor(public _chat: BotService) { }

  ngOnInit() {
    this.messages = this._chat.conversation.asObservable().pipe(scan((acc, val) => acc.concat(val)));
  }

  sendMessage() {
    if (this.formValue !== '') {
      this._chat.converse(this.formValue);
      this.formValue = '';
    }
  }
  closeConversation() {
    this._chat.converse('');
    this.formValue = '';
    this.close.emit(false);
  }
}
