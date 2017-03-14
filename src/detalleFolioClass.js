/**
Clase para manipular registros de la tabla "DETALLE_FOLIO".
  los datos estan ubicados en la hoja "Pedido BASE"
  -> id:"1edpUV-hPUmPVg9F-ZfSIoo-8d4xKhZQiCs5qby7PnZM"
  -> rango: "DETALLE_FOLIO"
**/

var DetalleFolio = function (idFolio, codSOFTLAND, precio, pedido) {
  
  // Atributos de la tabla.
  this.idFolio = idFolio;
  this.codSOFTLAND = codSOFTLAND;
  this.precio = precio;
  this.pedido = pedido;
  
}