/**
 * @fileOverview Google Apps Script and Google Spreadsheet demo: Chilebeef - Purchases. 
 * Data Models
 * @author Sebastian Cornejo - Embrio Chile SA 2017
 * @author.email scornejo@gbscorp.cl - sebastian.cornejo.berrios@gmail.com
 */

/**
 * Constructs a new Database conection 
 * @constructor
 */

var BusinessType = function () {
  this.tableName_ = 'business_type';
};

/**
 * Heredar metodos de Model 
 * @constructor
 */
BusinessType.prototype = new Model;



BusinessType.prototype.businessTypeRecord = function (record) {
  this.id = [record[0]];
  this.data = {businessTypeName: record[1]};
}



BusinessType.prototype.getAllRecords = function (tableName) {
  var records = [];
  var query = Model.prototype.getAllRecords.call(this, tableName);
  
  for ( var col = 0; col < query.length ; col++ ) {
    var record = new this.businessTypeRecord(query[col]);
    records.push(record);
  }  
  return records;
}


/** Funcion para seleccionar un registro a partir de si identificador.
 * @param {variant} id Identificador del registro a buscar.
 * @return {array} registro completo.
 */
BusinessType.prototype.selectById = function (id) {
  var bt = new BusinessType();
  var query = Model.prototype.selectById.call(this, this.tableName_, id);
  var record = bt.uploadRecords(query);
  
  return bt.getRecords();
}

function BusinessTypeTest() {
  var table = new BusinessType();
  var query = table.getAllRecords(table.getTableName());
  var records = table.uploadRecords(query);
  var record = table.selectById(2);
  Logger.log(records);
  Logger.log (record);
  Logger.log(table.dataModel);
};