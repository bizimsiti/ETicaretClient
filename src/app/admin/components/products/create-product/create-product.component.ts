import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerName } from '../../../../base/base.component';
import { CreateProduct } from '../../../../contracts/create_product';
import { AlertifyService, MessageOptions, MessagePosition, MessageType } from '../../../../services/admin/alertify.service';
import { FileUploadOptions } from '../../../../services/common/file-upload/file-upload.component';
import { ProductService } from '../../../../services/common/models/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent extends BaseComponent implements OnInit {

  constructor(private productService: ProductService, spinner: NgxSpinnerService, private alertify: AlertifyService) {
    super(spinner)
  }

  ngOnInit(): void {
  }
  @Output() createdProduct: EventEmitter<CreateProduct> = new EventEmitter();
  @Input() fileUploadOptions: Partial<FileUploadOptions> = {
    controller: "products",
    action: "upload",
    descriptionText: "Resim seçiniz",
    accept : ".png,.jpg,.jpeg"
  }
  // create button event handle
  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerName.SaveSpinner)
    const product = new CreateProduct();
    product.name = name.value;
    product.stock = parseInt(stock.value);
    product.price = parseFloat(price.value);

    this.productService.create(product, () => {
      this.hideSpinner(SpinnerName.SaveSpinner), this.alertify.message("ürün eklendi", {
        messageType: MessageType.Success, position: MessagePosition.TopRight, delay: 3
      })
      this.createdProduct.emit(product);
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
    })
  }
}
