import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessagePosition, MessageType } from '../../services/admin/alertify.service';
import { DialogService } from '../../services/common/dialog.service';
import { HttpClientService } from '../../services/common/http-client.service';

declare var $: any;
@Directive({
  selector: '[appDelete]'
})


export class DeleteDirective {

  constructor(private element: ElementRef, private _renderer: Renderer2, private http: HttpClientService, private dialog: MatDialog, private alertify: AlertifyService,private dialogService: DialogService) {
    const icon = _renderer.createElement("mat-icon");
    _renderer.appendChild(icon, _renderer.createText("delete"));
    _renderer.addClass(icon, 'material-icons');
    _renderer.addClass(icon, 'material-icons-delete');
    _renderer.appendChild(element.nativeElement, icon);

  }
  @Input() controller: string;
  @Input() id: string;
  @Output() callbackGetProducts: EventEmitter<any> = new EventEmitter();

  @HostListener('click')
  onClick() {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState,
      afterClosed: () => {
        const td: HTMLTableCellElement = this.element.nativeElement;
        this.http.delete({
          controller: this.controller
        }, this.id).subscribe(() => {
          $(td.parentElement).fadeOut(1000, () => {
            this.callbackGetProducts.emit()
            this.alertify.message("ürün başarıyla silinmiştir", {
              delay: 2000,
              messageType: MessageType.Success,
              position: MessagePosition.TopRight
            })
          })
        })
      }
    })
  }
  
  //openDialog(callback:() => void): void {
  //  const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //    width: '250px',
  //    data: DeleteState.YES
  //  });

  //  dialogRef.afterClosed().subscribe(result => {
  //    console.log('The dialog was closed', result);

  //    if (result === DeleteState.YES) {
  //      callback();
  //    }
  //  });
  //}

}
