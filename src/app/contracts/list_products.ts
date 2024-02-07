export interface List_Product {
  id: string ;
  name: string ;
  price: number ;
  stock: number ;
  createdDate: Date ;
  updatedDate: Date ;
}

export interface GetAllProducts {
  totalCount: number;
  products: List_Product[]
}
