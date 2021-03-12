import { NotificationService } from './notification.service';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class WebsocketService {
    constructor(private notification: NotificationService, @Inject('WSS_URL') private wssUrl){}
    private ws: WebSocket;
    open(): void {
        console.log('open wss');
        this.ws = new WebSocket(this.wssUrl);
        this.ws.addEventListener('open', (event) => {
            console.log('open wss', event);
            console.log(event);
        });
        this.ws.addEventListener('message', (event) => {
            console.log('Message from server ', event.data);
            this.notification.show(event.data, 'Obrigado!');
        });
        this.ws.addEventListener('close', () => {
            console.log('close wss');
        });
    }

    close(): void {
        this.ws.close();
    }

}
