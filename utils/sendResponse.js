module.exports = (app) => {
   app.response.sendResponse = function( message, data = undefined ){
    this.json({
        data : data,
        statusCode : this.statusCode,
        message : message
    })
 }
}