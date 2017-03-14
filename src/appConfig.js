/**
 * @fileOverview Google Apps Script and Google Spreadsheet demo: Chilebeef - Purchases. 
 * Connection to Google SpreadSheet with the general config. 
 * @author Sebastian Cornejo - Embrio Chile SA 2017
 * @author.email scornejo@gbscorp.cl - sebastian.cornejo.berrios@gmail.com
 */

/**
 * Constructs a new Database conection 
 * @constructor
 */

var AppConfig = function() {
  /**
   * The spreadsheet id
   * @type {string}
   * @private
   */
  this.ssid_ = '1wruWw3kpcOzWQFgexm1z53PaVBTpCmayVRnDFpTDl7I';
  
  
  /**
   * The spreadsheet
   * @type {SpreadSheetApp}
   * @private
   */
  this.ss = SpreadsheetApp.openById(this.ssid_);
  
  
  /**
   * The config 
   * @type {SpreadSheetApp}
   * @private
   */
  this.databaseConfig_ = {
    address_: this.ss.getRangeByName('ip_address_').getValue(),
    user_: this.ss.getRangeByName('user_').getValue(),
    password_: this.ss.getRangeByName('password_').getValue(),
    databaseName_: this.ss.getRangeByName('database_name_').getValue()
  };
}

/**
 * Loads configuration settings from the spreadsheet.
 * @return {AppConfig.Config} The current app configuration, or null if the app
 * hasn't yet been configured.
 */
AppConfig.prototype.getDatabaseConfig = function () {
  var config = {
    ipAddress: this.databaseConfig_['address_'],
    user: this.databaseConfig_['user_'],
    password: this.databaseConfig_['password_'],
    databaseName: this.databaseConfig_['databaseName_']
  }
  return config;
}

function AppConfigtest(){
  test = new AppConfig();
  Logger.log(test.getDatabaseConfig());
}