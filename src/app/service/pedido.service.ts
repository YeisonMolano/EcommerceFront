import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../modells/Pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private rutaGlobal = 'http://localhost:8080/pedido/'

  constructor(private http: HttpClient) { }

  getAllPedidos(){
    return this.http.get<Pedido[]>(this.rutaGlobal + 'get-all')
  }

  newPedido(pedido: Pedido){
    return this.http.post<Pedido>(this.rutaGlobal + 'new-pedido', pedido, {
      observe: 'response'
    })
  }

  updatePedido(pedido: Pedido){
    return this.http.put<Pedido>(this.rutaGlobal + pedido.idPedido, pedido, {
      observe: 'response'
    })
  }

  deletePedido(idPedido : number){
    return this.http.delete(this.rutaGlobal + idPedido)
  }
}
