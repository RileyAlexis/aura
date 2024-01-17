const socketIO = require('socket.io');

function initializeSockets(server) {
    
    let messages = [{
        user: 'Riley',
        message: 'Websockets has connected to the things and it probably mostly works now'
    }];

    let onlineUsers = [];
    let openConnections = [];

    const io = socketIO(server, {
        cors: {
            origin: "http://localhost:3000",
            credentials: true
        }
    });

    io.on('connection',(socket) => {
        console.log('A user connected to ', socket.id);
        openConnections.push(socket.id);
        console.log("Open socket connections", openConnections);
    
        socket.on('onlineUsers', (data) => {
            console.log('Online Users received', data.user);
        });
    
        socket.on('message:post', (data) => {
            messages.push({ user: data.user, message: data.message });
            console.log('New Message', data);
            console.log(openConnections);
        });

        socket.on('disconnect', () => {
            console.log('User Disconnected', socket.id);
            openConnections = openConnections.filter((item) => item !== socket.id);
            console.log("Open Connections", openConnections); 
        });

    
        socket.emit("messages",  messages);
        socket.emit("onlineUsers", onlineUsers);
    });

    // io.on('disconnect', (socket) => {
    //     console.log("A user disconected from ", socket.id);
    //     openConnections = openConnections.filter((item) => item !== socket.id);
    // });
}

module.exports = initializeSockets;