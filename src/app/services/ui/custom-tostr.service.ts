import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomTostrService {

  constructor(private toastr: ToastrService) { }

  message(message: string, title: string, options: ToastrOptions) {
    this.toastr[options.messageType](message, title, { positionClass: options.position })
  }
}

export class ToastrOptions {
  messageType: ToastrMessageType = ToastrMessageType.Info;
  position: ToastrPosition = ToastrPosition.BottomRight
}

export enum ToastrMessageType {
  Error = "error",
  Success = "success",
  Warning = "warning",
  Info = "info"
}

export enum ToastrPosition {
  TopRight = "toast-top-right",
  BottomRight = "toast-bottom-right",
  TopLeft = "toast-top-left",
  BottomLeft = "toast-bottom-left"
}
