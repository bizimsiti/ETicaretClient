import {NgxSpinnerService } from "ngx-spinner";

export class BaseComponent {

  constructor(private spinner: NgxSpinnerService) { }


  showSpinner(spinnerName: SpinnerName) {
    this.spinner.show(spinnerName)
  }
  hideSpinner(spinnerName: SpinnerName) {
    this.spinner.hide(spinnerName)
  }
}

export enum SpinnerName {
  PageSpinner = "pageSpinner",
  SaveSpinner = "saveSpinner",
  LoginSpinner = "loginSpinner"
}
