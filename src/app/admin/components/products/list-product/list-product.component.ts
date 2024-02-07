import { Component,OnInit,ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerName } from '../../../../base/base.component';
import { List_Product } from '../../../../contracts/list_products';
import { AlertifyService, MessagePosition, MessageType } from '../../../../services/admin/alertify.service';
import { ProductService } from '../../../../services/common/models/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent extends BaseComponent implements OnInit {

  constructor(private productService: ProductService, spinner: NgxSpinnerService, private alertify: AlertifyService) {
    super(spinner)
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns: string[] = ['name', 'price', 'stock', 'createdDate', 'updatedDate','edit','delete'];
  dataSource: MatTableDataSource<List_Product> = null;

  getAllProducts() {
    const pageIndex = this.paginator ? this.paginator.pageIndex : 0;
    const pageSize = this.paginator ? this.paginator.pageSize : 5;
    this.showSpinner(SpinnerName.PageSpinner)
    this.productService.read(pageIndex, pageSize,
      (data) => {
        this.dataSource = new MatTableDataSource(data.products)
        this.paginator.length = data.totalCount;
        this.hideSpinner(SpinnerName.PageSpinner)
      }, (errors: Array<{ key: string, value: Array<string> }>) => {
        errors.forEach((value, i) => {
          value.value.forEach(v => {
            this.alertify.message(v, {
              delay: 10,
              messageType: MessageType.Error,
              position: MessagePosition.BottomLeft
            })
          })
        })
      }
    );
  }

  pageEvent(e: PageEvent) {
    this.getAllProducts();
  }

  ngOnInit(): void {
    this.getAllProducts()
  }

}
