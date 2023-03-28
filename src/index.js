import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ConfigProvider } from "antd";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

// antd custom theme for default components
const antdCustomThemeSetup = {
  components: {
    Button: {
      colorPrimary: "#E21818",
      colorPrimaryHover: "#DF2E38",
      borderRadius: "0",
    },
  },
  token: {
    colorPrimary: "#E21818",
    colorPrimaryHover: "#DF2E38",
  },
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={antdCustomThemeSetup}>
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
