import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerName } from '../../../base/base.component';
import { CreateProduct } from '../../../contracts/create_product';
import { HttpClientService } from '../../../services/common/http-client.service';
import { ListProductComponent } from './list-product/list-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private http: HttpClientService) {
    super(spinner)
  }

  @ViewChild(ListProductComponent) listComponent: ListProductComponent;

  ngOnInit(): void {
    //this.http.get<Product[]>({ controller: "products" }).subscribe(data => console.log(data))

    //this.http.post({ controller: "products" }, {
    //  name: "kalem",
    //  stock: 10,
    //  price: 10
    //}).subscribe();
    //this.http.post({ controller: "products" }, {
    //  name: "silgi",
    //  stock: 10,
    //  price: 1
    //}).subscribe();
    //this.http.post({ controller: "products" }, {
    //  name: "kağıt",
    //  stock: 10,
    //  price: 20
    //}).subscribe();
    //this.http.put({ controller: "products" }, { id: "f30eb486-f3d1-42db-b46e-f1c7c6cf2edc", name: "yeni kağıt" }).subscribe();
    //this.http.delete({ controller: "products" }, "81af3060-06eb-4f2c-ac33-0c2d949c015d").subscribe();

  }

  createdProduct(product: CreateProduct) {
    this.listComponent.getAllProducts();
  }

}
