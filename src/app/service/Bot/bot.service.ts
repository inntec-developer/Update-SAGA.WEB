import { ApiConection } from './../api-conection.service';
import { Injectable } from '@angular/core';
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class Message {
  constructor(public content: string, public sentBy: string) {}
}
@Injectable({
  providedIn: 'root'
})
export class BotService {
  public ServiceUrl = ApiConection.ServiceUrl;
  readonly token = environment['dialogflow'].angularBot;

  readonly client = new ApiAiClient({ accessToken: this.token });
  conversation = new BehaviorSubject<Message[]>([]);

  constructor(private _httpClient: HttpClient) {
  }

  converse(msg: string) {
    if (msg !== '') {
      const userMessage = new Message(msg, 'user');

      this.update(userMessage);

      return this.client.textRequest(msg)
      .then( res  => {
        let speech = '';
          speech = res.result.fulfillment.speech;
          const botMessage = new Message(speech, 'bot');

          this.update(botMessage);
      });
    } else {
      const botMessage = new Message('', '');
       this.update(botMessage);
    }
  }
  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }
}
  // Sucursales(filtro): Observable<any> {
  //   return this._httpClient.get(this.ServiceUrl + 'ChatBot/sucursales?filtro=' + filtro);
  // }

  // if (res.result.parameters.ciudad === 'Guadalajara') {
  //   this.Sucursales(res.result.parameters.ciudad).subscribe( data => {
  //     if (data !== 417) {
  //       speech = 'contamos con ' + data.length + ' sucursales en ' + res.result.parameters.ciudad;
  //       data.forEach(element => {
  //         speech = speech + ' ' + element + '-';
  //       });
  //     } else {
  //       speech = res.result.fulfillment.speech;
  //     }
  //     const botMessage = new Message(speech, 'bot');

  //     this.update(botMessage);
  //   });
  // }
