import { socket } from '../sockets';

// import { storeInstance as store } from './store';

export const openSockets = (user, setMsgs) => {
    // const state = store.getState();
    socket.connect();
    socket.on('connect', () => {
      console.log('Connected to Server', user);  
    });
  
    socket.on('disconect', () => {
      console.log("Disconnected from server");
    });
  
    // socket.on('msg:get', (data) => {
    //     console.log(data.messages);
    //   // setMsgs(data.messages);
    // });
  
    // socket.on('onlineUsers', (data) => {
    //   console.log('onlineUsers received', data);
    //   store.dispatch({type: "onlineUsers/setAllOnlineUsers", payload: data });
    // });
}

export const sendMessage = (message) => {
  socket.emit('msg:post', ({user: message.user, message: message.message }))
}

export const socketService = {
  emitEvent: (eventName, data) => {
    socket.emit(eventName, data);
  },
  onEvent: (eventName, callback) => {
    socket.on(eventName, callback);
  },
  disconnect: () => {
    socket.disconnect();
  }
}