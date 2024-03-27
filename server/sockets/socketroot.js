const socketIO = require('socket.io');

let onlineUsers = [];
let openConnections = [];

function addUser(data) {
    console.log('Data to add user', data);
    const isUnique = onlineUsers.every(user => user.id !== data.id);
    if (isUnique) {
        onlineUsers.push(data);
    }
}

function removeUser(data) {
    console.log('User Removed', data);
    onlineUsers = onlineUsers.filter((item) => item.userid !== data.userId);
}

function initializeSockets(server) {

    let messages = [{
        user: 'Riley',
        message: 'Websockets has connected to the things and it probably mostly works now'
    }];


    const io = socketIO(server, {
        cors: {
            origin: "http://localhost:3000",
            // path: "/sockets/",
            credentials: true
        }
    });

    // const io = socketIO(server);

    io.engine.on("connection_error", (error) => {
        console.log('Error Request', error.req);
        console.log('Error Code', error.code);
        console.log('Error Message', error.message);
        console.log('Error Conext', error.context);
    })

    io.on('connection', (socket) => {
        console.log('A user connected to ', socket.id);
        openConnections.push(socket.id);
        console.log("Open socket connections", openConnections);
        console.log("Online Users", onlineUsers);
        io.emit("messages", messages);


        socket.on('onlineUsers:post', (data) => {
            console.log('Online Users received', data);
            addUser(data.user);
            socket.emit('onlineUsers:get', onlineUsers);
        });

        socket.on('onlineUsers:delete', (data) => {
            console.log('Online user removed', data);
            removeUser(data.user);
            socket.emit('onlineUsers:get', onlineUsers);
        })

        socket.on('message:post', (data) => {
            messages.push({ user: data.user, message: data.message });
            io.emit("messages", messages); //use io to send to all connections
            console.log('New Message', data);
            console.log(openConnections);
        });

        socket.on('disconnect', () => {
            console.log('User Disconnected', socket.id);
            openConnections = openConnections.filter((item) => item !== socket.id);
            console.log("Open Connections", openConnections);
            console.log("Online Users", onlineUsers);
        });



        // socket.emit("messages",  messages);
        // socket.emit("onlineUsers", onlineUsers);
    });

}

module.exports = initializeSockets;