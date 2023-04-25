import { Persona } from "./Persona";
import { Producto } from "./Producto";

export class Pedido{
    public idPedido?: number
    public producto?: Producto ;
    public comprador?: string ;
    public cantidad?: number
}