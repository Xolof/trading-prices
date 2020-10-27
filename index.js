var app = require('express')();
const cors = require("cors");
// TODO: Configure cors
app.use(cors());
var http = require('http').Server(app);
const io = require('socket.io')(http);
const stock = require("./stock.js");
const { saveItem, getItems } = require("./db/db");
const bulbs = require("./data/bulbs.js");

io.origins(['https://trading.oljo.me:443']);

app.get("/prices", async function(req, res) {
    let priceHistory = await getItems();

    if (priceHistory.length >= 100) {
        priceHistory = priceHistory.slice(priceHistory.length -100);
    }

    res.json(priceHistory);
});

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

setInterval(function () {
    bulbs.map((bulb) => {
        bulb["startingPoint"] = stock.getStockPrice(bulb);
        bulb["time"] = new Date().getTime();
        return bulb;
    });

    saveItem({ bulbs });

    io.emit("stocks", bulbs);
}, 5000);


http.listen(4000, function() {
    console.log('listening on *:4000');
});
