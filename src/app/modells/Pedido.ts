import { Persona } from "./Persona";
import { Producto } from "./Producto";

export class Pedido{
    public idPedido?: number
    public productos?: Producto[] ;
    public comprador?: Persona ;
}