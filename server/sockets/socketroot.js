const socketIO = require('socket.io');

function initializeSockets(server) {
    
    let messages = [{
        user: 'Riley',
        message: 'Websockets has connected to the things and it probably mostly works now'
    }];

    let onlineUsers = [];
    const io = socketIO(server, {
        cors: {
            origin: "http://localhost:3000",
            credentials: true
        }
    });

    io.on('connection',(socket) => {
        console.log('A user connected to ', socket.id);
    
        socket.on('onlineUsers', (data) => {
            console.log('Online Users received', data.user);
            if (data.user !== null || data.user !== undefined) onlineUsers.push(data.user);
        });
    
        socket.on('msg:post', (data) => {
            messages.push({ user: data.user, message: data.message });
        });
    
        socket.emit("messages", { messages });
        socket.emit("onlineUsers", { onlineUsers });
    });

    io.on('disconnect', (socket) => {
        console.log("A user disconected from ", socket.id);
    });
}

module.exports = initializeSockets;