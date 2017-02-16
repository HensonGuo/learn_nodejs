var server = require("./l_simple_server");
var router = require("./l_rout");
var requestHandlers = require("./l_handlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);