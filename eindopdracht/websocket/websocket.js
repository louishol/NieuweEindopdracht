// Port where we'll run the websocket server
var webSocketsServerPort = 1337;
 
// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');
// list of currently connected clients (users)
var clients = [ ];
/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {
    // Not important for us. We're writing WebSocket server, not HTTP server
});
server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});
/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
    // WebSocket server is tied to a HTTP server. WebSocket request is just
    // an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
    httpServer: server
});

wsServer.on('request', function(request) {
console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
// accept connection - you should check 'request.origin' to make sure that
// client is connecting from your website
// (http://en.wikipedia.org/wiki/Same_origin_policy)
var connection = request.accept(null, request.origin); 
// we need to know client index to remove them on 'close' event

var index = clients.push(connection) - 1;
console.log("Nieuwe connectie, aantal connecites zijn :" + clients.length);
// user sent some message
connection.on('message', function(message) {
    var _message  = JSON.parse(message.utf8Data);
    var obj = 
    {
        race: _message.race,
        user: _message.user,
        waypoint: _message.waypoint
    }
    var json = JSON.stringify({ type:'message', data: obj });
    for (var i=0; i < clients.length; i++) {
        clients[i].sendUTF(json);
    }
});
// user disconnected
connection.on('close', function(connection) {
        // remove user from the list of connected clients
        clients.splice(index, 1);
    
});

});