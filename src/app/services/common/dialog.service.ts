import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(dialogParameters: DialogParameters): void {
    const dialogRef = this.dialog.open(dialogParameters.componentType, {
      width: '250px',
      data: dialogParameters.data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);

      if (result === dialogParameters.data) {
        dialogParameters.afterClosed()
      }
    });
  }
}

interface DialogParameters {
  componentType: ComponentType<any>,
  data: any,
  afterClosed : ()=>void
}
