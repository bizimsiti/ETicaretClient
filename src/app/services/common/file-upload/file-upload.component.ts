import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { AlertifyService, MessagePosition, MessageType } from '../../admin/alertify.service';
import { CustomTostrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-tostr.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  constructor(private http: HttpClientService, private alertify: AlertifyService, private toastr: CustomTostrService) { }

  ngOnInit(): void {
  }

  public files: NgxFileDropEntry[];
  @Input() options: Partial<FileUploadOptions> = {
    isAdminPage:false
  }

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    const successMessage: string = "Dosyalar başarıyla yüklenmiştir.";
    const errorMessage: string = "Dosyalar yüklenirken bir hata oluştu!"
    
    for (const file of files) {

      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      })
    };
      this.http.post({
        controller: this.options.controller,
        action: this.options.action,
        queryString: this.options.queryString,
        headers: new HttpHeaders({ "responseType": "blob" })
      }, fileData).subscribe((response) => {

        if (this.options.isAdminPage) {
          this.alertify.message(successMessage, {
            delay: 2000,
            messageType: MessageType.Success,
            position: MessagePosition.TopRight
          })
        } else {
          this.toastr.message(successMessage, "Başarılı", {
            messageType: ToastrMessageType.Success,
            position: ToastrPosition.TopRight
          })
        }
      }, (errorResponse: HttpErrorResponse) => {
        if (this.options.isAdminPage) {
          this.alertify.message(errorMessage, {
            delay: 2000,
            messageType: MessageType.Error,
            position: MessagePosition.TopRight
          })
        } else {
          this.toastr.message(errorMessage, "Hata", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopRight
          })
        }
      })
  }
  //public fileOver(event: any) {
  //  console.log(event);
  //}

  //public fileLeave(event: any) {
  //  console.log(event);
  //}
}
export interface FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  descriptionText?: string;
  accept?: string;
  isAdminPage: boolean
}
