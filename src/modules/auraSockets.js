import { socket } from '../sockets';

import { storeInstance as store } from './store';
import { setUserSocketId } from './reducers/userStats';

export const openSockets = () => {
  const state = store.getState();
  socket.connect();
  console.log('Open Sockets function called');

  socket.on('connect', () => {
    console.log('Connected to Server', socket.id);
    // const state = store.getState();
    store.dispatch(setUserSocketId(socket.id));
    socket.emit('onlineUsers:post', ({ user: state.user }));
  });

  socket.on('connection_error', (error) => {
    console.log('Socket Error', error.message);
    console.log('Socket Error Description', error.description);
    console.log('Socket Error Context', error.context);
  })

  socket.on('disconect', () => {
    console.log("Disconnected from server", socket.id);
    socket.emit('onlineUsers:delete', ({ user: state.user.id }));
    socket.disconnect();
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
  socket.emit('msg:post', ({ user: message.user, message: message.message }))
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