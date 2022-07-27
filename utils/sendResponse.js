/** 
 * @method
 * @param {object} app is instance of express application class. 
 * This function is used to send common  json  API response. 
 * We can call @method sendResponse() method on @see application.
 * 
 */
module.exports = (app) => {
   app.response.sendResponse = function( message, data = undefined ){
    this.json({
        message : message,
        statusCode : this.statusCode,
        data : data
        
    })
 }
}