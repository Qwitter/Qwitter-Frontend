import io from "socket.io-client";
const SOCKET_URL = "http://back.qwitter.cloudns.org:3000/";

export const socket = io(SOCKET_URL);
