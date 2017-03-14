/**
 * @fileOverview Google Apps Script and Google Spreadsheet demo: Chilebeef - Purchases.
 * Event dispatcher. The scripting infrastructure calls function in this file to
 * handle events like "document opened" or "menu item clicked", and this file
 * invokes the appropriate methods on the {@code Controller} class.
 * @author Sebastian Cornejo - Embrio Chile SA 2017
 * @author.email scornejo@gbscorp.cl - sebastian.cornejo.berrios@gmail.com
 */


/**
 * Handles application initialization when Google SpreadSheet is opened.
 */

function onOpen() {
  // Add some menu items to the Google SpreadSheet processor.
  // This menu items call into the Apps Script handlers listed bellow when clicked.
  SpreadsheetApp.getUi()
    .createMenu('Ordenes de Compra')
      .addItem('Nueva OC', 'newOrderMenuItem_onClick')
      .addItem('Enviar OC', 'sendOrderMenuItem_onClick')
      .addItem('Modificar OC','changeOrderMenuItem_onClick')
//      .addSeparator()
//      .addSubMenu(SpreadsheetApp.getUi().createMenu('My Submenu')
//        .addItem('One Submenu Item', 'mySecondFunction')
//        .addItem('Another Submenu Item', 'myThirdFunction'))
      .addToUi();
}

/**
 * Runs when add-ons is installed.
 */

function onInstall() {
  onOpen();
}


/**
 * Clear the data and delete filter to the spreadsheet to enter a new purchase order.
 * Update the purchase order id
 */

function newOrderMenuItem_onClick() {
  SpreadsheetApp.getUi().alert('newOrderMenuItem_onClick')
}


/**
 * Send the new purchase order data to the database. Update record date and user.
 */

function sendOrderMenuItem_onClick() {
  SpreadsheetApp.getUi().alert('sendOrderMenuItem_onClick')
}


/**
 * Update the last purchase order sent to the database with new data.
 */

function changeOrderMenuItem_onClick() {
  SpreadsheetApp.getUi().alert('changeOrderMenuItem_onClick')
}
