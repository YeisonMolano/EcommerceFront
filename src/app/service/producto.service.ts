import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../modells/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private rutaGlobal = 'http://localhost:8080/producto/'

  constructor(private http: HttpClient) { }

  getAllProductos(){
    return this.http.get<Producto[]>(this.rutaGlobal + 'get-all')
  }

  newProducto(producto: Producto){
    return this.http.post<Producto>(this.rutaGlobal + 'new-producto', producto, {
      observe: 'response'
    })
  }

  updateProducto(idUpdate: number, producto: Producto){    
    return this.http.put<Producto>(this.rutaGlobal + idUpdate, producto, {
      observe: 'response'
    })
  }

  deleteProducto(idProducto : number){
    console.log(this.rutaGlobal + idProducto, idProducto);
    
    return this.http.delete(this.rutaGlobal + idProducto)
  }
}
