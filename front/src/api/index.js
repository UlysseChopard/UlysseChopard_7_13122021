import axios from "axios";

const instance = axios.create({
  baseURL: "http://locahost:3000",
  timeout: 10000,
});

module.exports = instance;
