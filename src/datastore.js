/**
 * @fileOverview Google Apps Script and Google Spreadsheet demo: Chilebeef - Purchases. 
 * Connection to Google SQL Database
 * @author Sebastian Cornejo - Embrio Chile SA 2017
 * @author.email scornejo@gbscorp.cl - sebastian.cornejo.berrios@gmail.com
 */

/**
 * Constructs a new Database conection 
 * @constructor
 */

var DataStore = function() {
  /**
   * The IP address of the database store 
   * @type {string}
   * @private
   */
  this.address_ = new AppConfig().getDatabaseConfig()['ipAddress'];
 
   /**
   * The user name to connecto to database 
   * @type {string}
   * @private
   */
  this.user_ = new AppConfig().getDatabaseConfig()['user'];
  
  /**
   * The user password to coneect to database
   * @type {string}
   * @private
   */
  this.userPwd_ = new AppConfig().getDatabaseConfig()['password'];
  
  /**
   * The database name
   * @type {string}
   * @private
   */
  this.db_ = new AppConfig().getDatabaseConfig()['databaseName'];
  
  /**
   * The database name
   * @type {string}
   * @private
   */
  this.dbUrl_ = 'jdbc:mysql://' + this.address_ + '/' + this.db_;
}

/**
 * Loads the ip address for the JDBC.
 * @return {string} 
 */
DataStore.prototype.getIpAddress = function () {
  return this.address_;
}

/**
 * Loads the user for the JDBC.
 * @return {string} 
 */
DataStore.prototype.getUser = function () {
  return this.user_;
}

/**
 * Loads the user password for the JDBC.
 * @return {string} 
 */
DataStore.prototype.getUserPwd = function () {
  return this.userPwd_;
}

/**
 * Loads the database URL
 * @return {string} 
 */
DataStore.prototype.databaseURL = function () {
  return this.dbUrl_;
}

DataStore.prototype.getConection = function() {
  return Jdbc.getConnection(this.databaseURL(), this.getUser(), this.getUserPwd());
}


function test() {
  test = new DataStore;
  Logger.log(test.databaseURL());
}