import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.scss']
})
export class FileUploadDialogComponent extends BaseDialog<FileUploadDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<FileUploadDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: FileUploadState) {
    super(dialogRef)
  }

  ngOnInit(): void {
  }

}
export enum FileUploadState {
  YES,
  NO
};
