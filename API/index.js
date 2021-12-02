import axios from "axios";
const AUTH_TOKEN = "HPr5YHONFHyQy6bQR5vN2xY3koAKKQER";
// axios.defaults.baseURL = "";
// axios.defaults.headers.common["Auhoization-Token"] = AUTH_TOKEN;

export const Woo = axios.create({
  baseURL: "https://tomato.com.mm/wp-json/tomato/v1",
  headers: {
    "Auhoization-Token": AUTH_TOKEN,
  },
  // transformResponse: (data) => JSON.parse(data.substring(1)),
});

export const Cart = axios.create({
  baseURL: "https://tomato.com.mm/wp-json/cocart/v1",
  // transformResponse: (data) => JSON.parse(data.substring(1)),
});

export const Vendor = axios.create({
  baseURL: "https://tomato.com.mm/wp-json/dokan/v1/",
  // transformResponse: (data) => JSON.parse(data.substring(1)),
});
