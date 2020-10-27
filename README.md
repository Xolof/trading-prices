# trading-prices

Service simulating prices for trading platform.

## Choices of technologies

### Socket-service
The package Socket.io is used to deliver a flow of data with updates on the current prices of the items on the market. Every 5 seconds an event is emitted and the clients listening to the server can receive the data.
Socket.io is easy to use and has performed well throughout the development process. The updates of prices works very smoothly without any perceived disruptions.

### Database
To persist the history of prices the database MongoDB is used.
MongoDB was used because the format in which data is saved in Mongo is very similar to the format in which data is sent with socket.io.

Every time the prices are updated a copy of the data sent through the socket connection is saved to the database. This data can later be retrieved to make it possible to view the previous variations in prices.
There is a route "/prices" where the latest 100 entries of the history can be retrieved. The limitation to the 100 latest prices was made in order to not have to many data points on the graphs in the client. Obviously this limit could be adapted to allow showing different time spans of the history. For example, there could be a route where only one data point is delivered for every day.
