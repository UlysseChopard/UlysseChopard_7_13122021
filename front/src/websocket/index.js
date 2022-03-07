import VueSocketIO from "vue-3-socket.io";
import { io } from "socket.io-client";

export default (store) =>
  new VueSocketIO({
    debug: true,
    connection: io("ws://localhost:3000", { withCredentials: true }),
    vuex: {
      store,
      actionPrefix: "SOCKET_",
    },
  });
