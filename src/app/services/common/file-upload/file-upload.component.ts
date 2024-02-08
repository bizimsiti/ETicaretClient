import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { FileUploadDialogComponent, FileUploadState } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { AlertifyService, MessagePosition, MessageType } from '../../admin/alertify.service';
import { CustomTostrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-tostr.service';
import { DialogService } from '../dialog.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  constructor(private http: HttpClientService, private alertify: AlertifyService, private toastr: CustomTostrService, private dialog: MatDialog, private dialogService: DialogService) { }

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
    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadState,
      afterClosed: () => {
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
        });
      }
    });
    
  };
  //openDialog(callback: () => void): void {
  //  const dialogRef = this.dialog.open(FileUploadDialogComponent, {
  //    width: '250px',
  //    data: FileUploadState.YES
  //  });

  //  dialogRef.afterClosed().subscribe(result => {
  //    console.log('The dialog was closed', result);

  //    if (result === FileUploadState.YES) {
  //      callback();
  //    }
  //  });
  //}
};
export interface FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  descriptionText?: string;
  accept?: string;
  isAdminPage: boolean
}
