import { Injectable } from '@angular/core';
declare var alertify: any

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message: string, options: MessageOptions) {
    alertify.set('notifier', 'delay', options.delay);
    alertify.set('notifier', 'position', options.position);
    alertify[options.messageType](message);
    
  }
  dismiss() {
    alertify.dismissAll();
  }
}

export class MessageOptions {
  messageType: MessageType = MessageType.Success;
  position: MessagePosition = MessagePosition.BottomRight;
  delay: number = 5;
}

export enum MessageType {
  Error="error",
  Message="message",
  Notify="notify",
  Success="success",
  Warning ="warning"
}
export enum MessagePosition {
  TopRight = "top-right",
  BottomRight = "bottom-right",
  TopCenter = "top-center",
  BottomLeft = "bottom-left"
}
