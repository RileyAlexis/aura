import { socket } from '../sockets';

export const openSockets = (user, setMsgs) => {
    socket.connect();
    socket.on('connect', () => {
      console.log('Connected to Server', user);
      socket.emit('onlineUsers', ({ user: user.userId }));
  
    });
  
    socket.on('disconect', () => {
      console.log("Disconnected from server");
    });
  
    socket.on('msg:get', (data) => {
        console.log(data.messages);
      setMsgs(data.messages);
    });
  
    socket.on('onlineUsers', (data) => {
      console.log('onlineUsers received', data);
    //   setOnlineUsers(data);
    });
}
