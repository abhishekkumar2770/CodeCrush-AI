import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // ✅ This must be present
import axios from "axios";

// ✅ Enable Cookies for all requests globally
axios.defaults.withCredentials = true;
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={appStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
