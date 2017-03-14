/**
Funcion para extraer todos los datos de un archivo y rango especifico.
  @param: idSpreadSheet, id de la planilla en la que se encuentran los datos
  @param: range, nombre del rango que contiene los datos.
  @return: retora un objeto Range con los datos de la hoja. De lo contrario devuelve un string indicando un error.
**/

function recoverData(idSpreadSheet, sheetName) {
  
  // Analizar si los valores ingresados no son null.
  if ( idSpreadSheet == null || sheetName == null ) {
    return "idSpreadSheet: " + idSpreadSheet + " or sheetName: " + sheetName + " is null";
  }
  
  // Declaracion de variables
  var spreadsheet = SpreadsheetApp.openById(idSpreadSheet);
  
  // Si no encuentra el id de la planilla, devuelve un error
  if ( spreadsheet == null ) {
    return "no se encuentra el archivo con el id: " + idSpreadSheet;
  }
  
  var sheet = spreadsheet.getSheetByName(sheetName);
  
  // Si no encuentra la hoja con el nombre especifico, devuelve un error.
  if ( sheet == null ) {
    return "No se encuentra la hoja: " + sheetName + " en el archivo: " + spreadsheet.getName();
  }
  
  var rows = sheet.getDataRange();
  var values = rows.getValues();
  
  
  if (0 > values.length) {
    return "Tabla sin datos";
  }
  
  return values;
}