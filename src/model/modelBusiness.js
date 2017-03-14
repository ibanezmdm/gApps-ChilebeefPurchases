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

var Business = function () {
  this.tableName_ = 'business';
};


/**
 * Heredar metodos de Model 
 * @constructor
 */
Business.prototype = new Model;



Business.prototype.businessRecord = function (record) {
  var bt = new BusinessType().selectById(record[3]);

  this.id = [record[0]];
  this.data = 
    {
      businessName: record[1],
      businessBrandName: record[2],
      businessType_id: record[3]
    };
}



Business.prototype.getAllRecords = function (tableName) {
  var records = [];
  var query = Model.prototype.getAllRecords.call(this, tableName);
  
  for ( var col = 0; col < query.length ; col++ ) {
    var record = new this.businessRecord(query[col]);
    records.push(record);
  }  
  return records;
}



function BusinessTest() {
  var table = new Business();
  var query = table.getAllRecords(table.getTableName());
  var records = table.uploadRecords(query);
  Logger.log(records)
};