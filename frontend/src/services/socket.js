import { io } from "socket.io-client";

const socket = io("http://localhost:4000"); // Update if your backend runs on a different port

export default socket;
