import io from "socket.io-client";
import { BASE_URL } from "./constants";

return io(BASE_URL, {
  auth: {
    token: localStorage.getItem("token"),
  },
});
