/**
 * @fileOverview Google Apps Script and Google Spreadsheet demo: Chilebeef - Purchases. 
 * Data Models
 * @author Sebastian Cornejo - Embrio Chile SA 2017
 * @author.email scornejo@gbscorp.cl - sebastian.cornejo.berrios@gmail.com
 */

/**
 * Constructs 
 * @constructor
 */

var Model = function () {
  this.DB = new DataStore().getConection();
  this.records_ = {};
  this.tableName_ = null;

  this.dataModel_ = {
    business_type: {
      id: [
        'businessType_id'
      ],
      data: [
        'businessTypeName'
      ]
    },

    um_softland: {
      id: [
        'umSoftlandCode_id'
      ],
      data: [
        'umSoftlandDescription'
      ]
    },

    um_cedar_creek: {
      id: [
        'umCedarCreekCode_id'
      ],
      data: [
        'umCedarCreekDescription'
      ]
    },

    business: {
      id: [
        'businessRut_id'
      ],
      data: [
        'businessName', 
        'businessBrandName',
        'businessType_id'
      ],
      belongs_to: {
        businessType: 'businessType_id'
      }
    },

    office: {
      id: [
        'office_id'
      ],
      data: [
        'officeCedarCreek_id', 
        'officeDescription', 
        'officeAddress', 
        'officeCity', 
        'officeEmail', 
        'officePhoneNumber',
        'businessRut_id'
      ],
      belongs_to: {
        business: 'businessRut_id'
      }
    },

    product: {
      id: [
        'product_id'
      ],
      data: [
        'productSoftland_id', 
        'productCedarCreek_id', 
        'productDescription', 
        'productCost', 
        'productBasePrice',
        'businessType_id',
        'umSoftlandCode_id',
        'umCedarCreekCode_id'
      ],
      belongs_to: {
        business: 'businessType_id', // Proveedor
        um_softland: 'umSoftlandCode_id',
        um_cedar_creek: 'umCedarCreekCode_id'
      }
    },

    purchase_order: {
      id: [
        'purchaseOrder_id'
      ],
      data: [
        'purchaseOrderName', 
        'requestUser', 
        'requestDate', 
        'deliveryDate', 
        'cedarCreekContract'
      ],
      belongs_to: {
        office: 'office_id'
      }
    },

    active_product: {
      id: [
        'office_id', 
        'product_id'
      ],
      belongs_to: {
        office: 'office_id',
        product: 'product_id'
      }
    },

    product_discount: {
      id: [
        'discunt_id'
      ],
      data: [
        'discountStartDate', 
        'discountEndDate', 
        'discount'
      ],
      belongs_to: {
        product: 'product_id'
      }
    },

    purchase_order_detail: {
      id: [
        'purchaseOrder_id', 
        'product_id'
      ],
      data: [
        'poLine', 
        'poQuantity', 
        'poBasePrice', 
        'poFinalPrice', 
        'poTotalLine'
      ],
      belongs_to: {
        purchase_order: 'purchaseOrder_id',
        product: 'product_id',
        product_discount: 'discunt_id'
      }
    }
  }
}

/** Funcion para seleccionar todps los registros de una tabla.
 * @param {string} tableName Nombre de la tabla a consultar.
 * @return {Array.Array} Todos los registros, como un array de arrays.
 */
Model.prototype.getAllRecords = function (tableName) {
  var stmt = this.DB.createStatement();
  var query = stmt.executeQuery('SELECT * FROM ' + tableName);
  var cols = query.getMetaData().getColumnCount();
  var records = [];
  
  while (query.next()) {
    var record = [];
    for (var col = 0; col < cols; col++) {
      record.push(query.getString(col + 1));
    }
    records.push(record);
  }
  
  query.close();
  stmt.close();
  
  return records;
}

/** Funcion para seleccionar un registro a partir de si identificador.
 * @param {string} tableName Nombre de la tabla a consultar.
 * @param {variant} id Identificador del registro a buscar.
 * @return {array} registro completo.
 */
Model.prototype.selectById = function (tableName, id) {
  var stmt = this.DB.createStatement();
  var name_id = this.dataModel_[tableName].id
  var where = "";

  for (var i = 0; i < name_id.length ; i++) {
    if (id instanceof Array){
      where = where + name_id[i] + " = " + id[i];
    }
    else {
      where = where + name_id[i] + " = " + id;
    }
    if ((i + 1) < name_id.length) {
      where = where + ' AND ';
    }
  }

  var query = stmt.executeQuery('SELECT * FROM ' + tableName + ' WHERE (' + where + ') LIMIT 1');
  var cols = query.getMetaData().getColumnCount();
  
  while (query.next()) {
    var record = [];
    for (var col = 0; col < cols; col++) {
      record.push(query.getString(col + 1));
    }
  }
  
  query.close();
  stmt.close();
  
  return record;
}


/** Funcion que retorna el nombre de la tabla.
 * @return {string} Nombre de la tabla.
 */
Model.prototype.getTableName = function () {
  return this.tableName_
};


/** Funcion que limpia todos los registros.
 * @return {object} array vacio.
 */
Model.prototype.clearRecords = function() {
  this.records_ = {};
  return this.getRecords();
}


/** Funcion que selecciona un registro a partir de los registros cargados.
 * @param {variant} id Identificador de registro a seleccionar.
 * @return {object} Registro como objeto 'id: valor'.
 */
Model.prototype.getRecord = function(id) {
  var record = {};
  record[id] = this.records_[id];
  return record;
}


/** Funcion que retorna todos los registros cargados.
 * @return {object} Registros como objeto 'id: valor'.
 */
Model.prototype.getRecords = function() {
  return this.records_;
}


/** Funcion que añade un nuevo registro a la clase.
 * @param {variant} id Identificador del registro.
 * @param {object} data Objeto con los valores del registro. Formato: colum[value].
 * @return {object} nuevo registro añadido.
 */
Model.prototype.addRecord = function (id, data) {
  this.records_[id] = data;
  return this.getRecord(id);
}


/** Funcion actualiza toda la lista de registros a partir de un array de registros.
 * @param {array.object} record Registros nuevos a cargar.
 * @return {object} Todos los registros nuevos cargados.
 */
Model.prototype.uploadRecords = function (records) {
  this.clearRecords();
  for (var i in records) {
    this.addRecord(records[i].id, records[i].data);
  }
  
  return this.getRecords();
}


function modelTest() {
  var model = new Model();
  var record = model.selectById('business_type', 1);
}