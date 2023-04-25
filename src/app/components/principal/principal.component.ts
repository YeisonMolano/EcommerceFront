import { Component, OnInit } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Pedido } from 'src/app/modells/Pedido';
import { Producto } from 'src/app/modells/Producto';
import { AuthService } from 'src/app/service/auth.service';
import { ProductoService } from 'src/app/service/producto.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit{
  isAdmin: boolean
  productos: Array<Producto>
  carrito: Array<Producto>
  cantidadDeCompra: number

  constructor(private aService: AuthService, private pService: ProductoService){
    this.isAdmin = false
    this.cantidadDeCompra = 1
    this.productos = new Array<Producto>()
    this.carrito = new Array<Producto>()
    let producto = new Producto()
    producto.stock = 15
    producto.categoria = 'hola'
    producto.foto = 'https://upload.wikimedia.org/wikipedia/commons/3/38/Gift-wraping.jpg'
    producto.idProducto = 12345
    producto.nombreProducto = 'Producto'
    producto.referencia = 'qwert'
    this.productos.push(producto)
    this.productos.push(producto)
  }

  ngOnInit(): void {
    if(this.aService.auth){
      this.isAdmin = true
    }
    this.getAllProductos()
  }

  getAllProductos(){
    this.pService.getAllProductos().subscribe(res =>{
      this.productos = res
    })
  }

  getSeverity(producto: Producto): string{
    console.log(producto);
    
    return ''
  }

  toggle(op: OverlayPanel, producto: Producto){
    producto.cantidad = this.cantidadDeCompra
    this.carrito.push(producto)
    op.hide();
  }

  comprar(){
    let pedido = new Pedido()
    pedido.comprador = {}
    pedido.productos = this.carrito
    console.log(pedido);
  }
}
