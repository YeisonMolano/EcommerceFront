import { Component, OnInit } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Pedido } from 'src/app/modells/Pedido';
import { Persona } from 'src/app/modells/Persona';
import { Producto } from 'src/app/modells/Producto';
import { AuthService } from 'src/app/service/auth.service';
import { PedidoService } from 'src/app/service/pedido.service';
import { ProductoService } from 'src/app/service/producto.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit{
  isAdmin: boolean
  comprador: Persona
  productos: Array<Producto>
  carrito: Array<Producto>
  cantidadDeCompra: number
  productoNuevo: Producto
  formProductoNuevo: FormGroup
  newProducto: boolean
  editar : number
  id: number

  constructor(private message: MessageService, private fb: FormBuilder, private aService: AuthService, private pService: ProductoService, private pedidoService: PedidoService){
    this.isAdmin = false
    this.comprador = new Persona()
    this.cantidadDeCompra = 1
    this.productos = new Array<Producto>()
    this.carrito = new Array<Producto>()
    this.productoNuevo = new Producto()
    this.newProducto = false
    this.editar = 0
    this.id = 0
    this.formProductoNuevo = fb.group({
      idProducto: new FormControl('', []),
      nombreProducto: new FormControl('', []),
      referencia: new FormControl('', []),
      categoria: new FormControl('', []),
      stock: new FormControl('', []),
      foto: new FormControl('', [])
    })
  }

  ngOnInit(): void {
    if(localStorage.getItem('auth') == 'admin'){
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
    this.cantidadDeCompra = 1
    op.hide();
    this.message.add({ severity: 'success', summary: 'Aplicado', detail: 'Se ha agregado un nuevo producto a tu carrito' });
  }

  comprar(){
    this.carrito.forEach((pedido) =>{
        let pedidoNew = new Pedido()
        if(localStorage.getItem('nombre') != undefined){
          pedidoNew.comprador = localStorage.getItem('nombre')?.toString()
        }
        console.log( localStorage.getItem('nombre'));
        
        pedidoNew.producto = pedido
        pedidoNew.cantidad = pedido.cantidad
        this.pedidoService.newPedido(pedidoNew).subscribe(res =>{
          this.getAllProductos()
        })
    })
    this.message.add({ severity: 'success', summary: 'Aplicado', detail: 'Se ha realizado la compra' });
    this.getAllProductos()
  }

  crearProducto(){
    if(this.formProductoNuevo.valid){
    let productouevo = new Producto()
    productouevo.categoria = this.formProductoNuevo.get('categoria')?.value
    productouevo.foto = this.formProductoNuevo.get('foto')?.value
    productouevo.idProducto = this.formProductoNuevo.get('idProducto')?.value
    productouevo.nombreProducto = this.formProductoNuevo.get('nombreProducto')?.value
    productouevo.referencia = this.formProductoNuevo.get('referencia')?.value
    productouevo.stock = this.formProductoNuevo.get('stock')?.value
    this.pService.newProducto(productouevo).subscribe(res => {
      this.getAllProductos()
      this.openNewProducto()
      this.formProductoNuevo.reset()
      this.message.add({ severity: 'success', summary: 'Aplicado', detail: 'Se ha creado un nuevo producto' });
    },
    err =>{
      this.message.add({ severity: 'warn', summary: 'Error', detail: 'Ha habido un error al ingresar los datos intentelo nuevamente' });
      this.formProductoNuevo.reset()
    })
    }else{
      this.message.add({ severity: 'warn', summary: 'Datos invalidos', detail: 'Por favor ingrese todos los campos' });
    }
  }

  openNewProducto(){
    this.newProducto = !this.newProducto
  }

  deleteProducto(idProducto: number){
    this.pService.deleteProducto(idProducto).subscribe(res =>{
      this.getAllProductos()
      this.message.add({ severity: 'success', summary: 'Aplicado', detail: 'Se ha eliminado el producto' });
    },
    err =>{
      this.message.add({ severity: 'warn', summary: 'Error', detail: 'Hubo un error al eliminar el producto' });
    })
  }

  cargarUpdate(producto : Producto){
    this.openNewProducto()
    this.editar = 1
    this.formProductoNuevo.get('categoria')?.setValue(producto.categoria)
    this.formProductoNuevo.get('foto')?.setValue(producto.foto)
    this.formProductoNuevo.get('idProducto')?.setValue(producto.idProducto)
    this.formProductoNuevo.get('nombreProducto')?.setValue(producto.nombreProducto)
    this.formProductoNuevo.get('referencia')?.setValue(producto.referencia)
    this.formProductoNuevo.get('stock')?.setValue(producto.stock)
    this.id = this.formProductoNuevo.get('idProducto')?.value
  }

  update(){
    if(this.formProductoNuevo.valid){
      let productouevo = new Producto()
      productouevo.categoria = this.formProductoNuevo.get('categoria')?.value
      productouevo.foto = this.formProductoNuevo.get('foto')?.value
      productouevo.idProducto = this.formProductoNuevo.get('idProducto')?.value
      productouevo.nombreProducto = this.formProductoNuevo.get('nombreProducto')?.value
      productouevo.referencia = this.formProductoNuevo.get('referencia')?.value
      productouevo.stock = this.formProductoNuevo.get('stock')?.value
      console.log(productouevo);
      
      this.pService.updateProducto(this.id, productouevo).subscribe(res => {
        this.getAllProductos()
        this.openNewProducto()
        this.formProductoNuevo.reset()
        this.editar = 0
        console.log(res);
        this.message.add({ severity: 'success', summary: 'Aplicado', detail: 'Se ha actualizado el producto' });
      },
      err =>{
        this.message.add({ severity: 'warn', summary: 'Datos invalidos', detail: 'Ha habido un error al actualizar' });
      })
      }
  }
}
