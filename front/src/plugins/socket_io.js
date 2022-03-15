import VueSocketIO from "vue-3-socket.io";
import { io } from "socket.io-client";

export default (store) =>
  new VueSocketIO({
    debug: true,
    connection: io("http://localhost:1895", { withCredentials: true }),
    vuex: {
      store,
      actionPrefix: "SOCKET_",
    },
  });
