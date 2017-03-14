/**
Clase para manipular registros de la tabla "FOLIO".
  los datos estan ubicados en la hoja "Pedido BASE"
  -> id:"1edpUV-hPUmPVg9F-ZfSIoo-8d4xKhZQiCs5qby7PnZM"
  -> rango: "FOLIO"
**/

var Order = function (idFolio, idCliente, fechaEmision, fechaDespacho, idContrato ) {
  
  // Atributos de la tabla.
  this.idFolio = idFolio;
  this.local = idCliente;
  this.fechaEmision = fechaEmision;
  this.fechaDespacho = fechaDespacho;
  this.idContrato = idContrato;
  
  // Detalle de productos en la orden de compra.
  this.detalle = new Array()
  
}