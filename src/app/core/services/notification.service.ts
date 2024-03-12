import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  pusher:any;
  channel:any;

  constructor() { }

  listen(userId:number) {
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster
    });

    this.channel = this.pusher.subscribe(userId.toString());

    this.channel.bind('notification', (data:any) => {
      console.log(data);
    });
  }

  unsubscribeChannel(userId:number) {
    this.pusher.unsubscribe(userId.toString());
  }
}
