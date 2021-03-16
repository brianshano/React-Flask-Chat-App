import React from "react";

import socketio from "socket.io-client";
import { endPoint } from "../config";

export const socket = socketio.connect(endPoint);
export const SocketContext = React.createContext();
