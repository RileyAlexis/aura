import { io } from "socket.io-client";

const URL = process.env.NODE_ENV === 'production' ? undefined : 'ws://localhost:5001';
console.log('Sockets URL', URL);
export const socket = io(URL, {
    withCredentials: true
});